import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { auth } from '../middleware/auth.js';

dotenv.config();

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_mock_key_secret',
});

// @route   POST /api/payment/create-order
// @desc    Create a Razorpay order
// @access  Private
router.post('/create-order', auth, async (req, res) => {
  const { amount } = req.body; // Amount should be in smaller unit (paise)

  try {
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Bad Request', message: 'Invalid payment amount.' });
    }

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise (e.g. 100 INR = 10000 paise)
      currency: 'INR',
      receipt: `receipt_${Math.random().toString(36).substr(2, 9)}`,
    };

    // If using mock keys, bypass network request and return mock order
    if (razorpay.key_id === 'rzp_test_mock_key_id') {
      return res.json({
        success: true,
        order: {
          id: `order_mock_${Math.random().toString(36).substr(2, 9)}`,
          amount: options.amount,
          currency: options.currency,
          receipt: options.receipt,
          status: 'created'
        }
      });
    }

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_key_id'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error', message: 'Failed to create Razorpay order.' });
  }
});

// @route   POST /api/payment/verify
// @desc    Verify Razorpay payment signature
// @access  Private
router.post('/verify', auth, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'rzp_test_mock_key_secret')
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid signature sent!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error', message: 'Payment verification failed' });
  }
});

export default router;
