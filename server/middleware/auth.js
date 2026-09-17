import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  // Extract token from header
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access Denied', message: 'No authorization token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'asiamart_super_secret_jwt_signature_key_123');
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Forbidden', message: 'Invalid or expired authorization token.' });
  }
};
