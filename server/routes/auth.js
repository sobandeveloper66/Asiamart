import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { findUserByEmail, findUserById, createUser } from '../config/dbHelper.js';
import { auth } from '../middleware/auth.js';
import { validateRegister, validateLogin } from '../middleware/validators.js';

const router = express.Router();

// Rate Limiting for Auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: { error: 'Too Many Requests', message: 'Too many attempts from this IP, please try again after 15 minutes' }
});

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', authLimiter, validateRegister, async (req, res) => {
  const { name, email, password, referralCode } = req.body;

  try {
    // 1. Validation
    let user = await findUserByEmail(email);
    if (user) {
      return res.status(400).json({ error: 'Bad Request', message: 'User already exists with this email.' });
    }

    // 2. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Generate unique Referral Code
    const cleanName = name.replace(/\s+/g, '').toUpperCase().slice(0, 5);
    const randomSuffix = Math.floor(10 + Math.random() * 90);
    const generatedReferralCode = `AM-${cleanName}${randomSuffix}`;

    // 4. Handle Friend Referral Bonus
    let welcomeCoins = 150; // default welcome coins
    if (referralCode) {
      const friend = await findUserByEmail(referralCode.toUpperCase().trim());
      if (friend) {
        // Friend referred: award 100 coins to the referring friend!
        friend.coins += 100;
        await friend.save();
        // Option: we could also give the new user an extra signup bonus
        welcomeCoins += 50; 
      }
    }

    const userData = {
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      coins: welcomeCoins,
      referralCode: generatedReferralCode,
      isAdmin: email.toLowerCase().includes('cssobanseliya@gmail')
    };

    user = await createUser(userData);

    // 6. Generate JWT token
    const userId = user._id || user.id;
    const token = jwt.sign(
      { id: userId, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'asiamart_super_secret_jwt_signature_key_123',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        coins: user.coins,
        referralCode: user.referralCode,
        isAdmin: user.isAdmin
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', authLimiter, validateLogin, async (req, res) => {
  const { email, password } = req.body;

  try {
    const isSystemAdmin = (email.toLowerCase().includes('cssobanseliya@gmail') && password === 'Asiamart@2026');
    let user = await findUserByEmail(email);

    // Auto-create Admin user if logging in with admin credentials for the first time
    if (!user && isSystemAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = await createUser({
        name: 'System Administrator',
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        coins: 1000,
        referralCode: 'AM-ADMIN',
        isAdmin: true
      });
    }

    if (!user) {
      return res.status(400).json({ error: 'Bad Request', message: 'Invalid credentials.' });
    }

    // 2. Validate Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Bad Request', message: 'Invalid credentials.' });
    }

    // 3. Sign JWT token
    const userId = user._id || user.id;
    const token = jwt.sign(
      { id: userId, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'asiamart_super_secret_jwt_signature_key_123',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        coins: user.coins,
        referralCode: user.referralCode,
        isAdmin: user.isAdmin
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
});

// @route   POST /api/auth/social
// @desc    Authenticate user directly via self OAuth API and Google / Facebook providers
router.post('/social', authLimiter, async (req, res) => {
  let { provider, email, name, avatar, accessToken, idToken } = req.body;

  try {
    if (!provider) {
      return res.status(400).json({ error: 'Bad Request', message: 'OAuth provider is required for social login.' });
    }

    // --- Direct Integration with Google OAuth / Identity UserInfo API ---
    if (provider.toLowerCase() === 'google' && (accessToken || idToken)) {
      try {
        const tokenToUse = accessToken || idToken;
        const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
          headers: { Authorization: `Bearer ${tokenToUse}` }
        });
        if (googleRes.ok) {
          const profile = await googleRes.json();
          email = profile.email || email;
          name = profile.name || profile.given_name || name;
          avatar = profile.picture || avatar;
        } else if (idToken) {
          // Verify via Google tokeninfo endpoint
          const infoRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
          if (infoRes.ok) {
            const profile = await infoRes.json();
            email = profile.email || email;
            name = profile.name || name;
            avatar = profile.picture || avatar;
          }
        }
      } catch (err) {
        console.warn('Google API direct validation fallback:', err.message);
      }
    }

    // --- Direct Integration with Meta (Facebook) Graph API ---
    if (provider.toLowerCase() === 'facebook' && accessToken) {
      try {
        const fbRes = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${accessToken}`);
        if (fbRes.ok) {
          const fbProfile = await fbRes.json();
          email = fbProfile.email || `${fbProfile.id}@facebook.com`;
          name = fbProfile.name || name;
          if (fbProfile.picture?.data?.url) {
            avatar = fbProfile.picture.data.url;
          }
        }
      } catch (err) {
        console.warn('Facebook Graph API direct validation fallback:', err.message);
      }
    }

    if (!email) {
      return res.status(400).json({ error: 'Bad Request', message: 'Email address could not be resolved from OAuth provider.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    let user = await findUserByEmail(cleanEmail);

    // If social account doesn't exist yet, register them automatically with Verified bonus!
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const randomSecret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const hashedPassword = await bcrypt.hash(randomSecret, salt);

      const cleanName = (name || 'Member').replace(/\s+/g, '').toUpperCase().slice(0, 5);
      const randomSuffix = Math.floor(10 + Math.random() * 90);
      const generatedReferralCode = `AM-${cleanName}${randomSuffix}`;

      user = await createUser({
        name: name || `${provider} User`,
        email: cleanEmail,
        password: hashedPassword,
        coins: 200, // Extra 200 Loyalty Coins bonus for social OAuth signups!
        referralCode: generatedReferralCode,
        isAdmin: cleanEmail.includes('cssobanseliya@gmail'),
        authProvider: provider,
        avatar: avatar || null
      });
    }

    const userId = user._id || user.id;
    const token = jwt.sign(
      { id: userId, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'asiamart_super_secret_jwt_signature_key_123',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        coins: user.coins,
        referralCode: user.referralCode,
        isAdmin: user.isAdmin,
        authProvider: provider,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Not Found', message: 'User profile not found.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
});

export default router;
