import express from 'express';
import { createOrder, getOrders, updateOrderStatusById, updateProductStock, adjustUserCoins, updateUserAddress } from '../config/dbHelper.js';

const router = express.Router();

// Helper to determine status description updates
const getStatusDesc = (status) => {
  switch (status) {
    case 'Processing': return 'Your order has been verified and is being prepared in our local warehouse.';
    case 'Shipped': return 'The package has been handed over to our delivery partner and is en route.';
    case 'Out for Delivery': return 'Our delivery executive is arriving in your area with your package.';
    case 'Delivered': return 'Package delivered successfully. Thank you for shopping with AsiaMart!';
    default: return 'Order placed successfully.';
  }
};

// @route   POST /api/orders
// @desc    Create a new order & update product inventory/coins balance
router.post('/', async (req, res) => {
  const { items, totalAmount, shippingAddress, userId, useCoins, coinsDiscount, paymentMethod, paymentStatus } = req.body;

  try {
    if (!items || items.length === 0 || !shippingAddress || !totalAmount) {
      return res.status(400).json({ error: 'Bad Request', message: 'Missing order details.' });
    }

    const mockOrderNum = Math.floor(100000 + Math.random() * 900000).toString();
    const timestamp = new Date().toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short'
    });

    // 1. Deduct Product Stock Counts
    for (let item of items) {
      await updateProductStock(item.product.id, item.quantity);
    }

    // 2. Adjust User Rewards Profile and Address (if userId is available)
    if (userId) {
      const cashbackEarned = Math.floor(totalAmount * 0.1);
      const coinsRedeemed = useCoins && coinsDiscount ? coinsDiscount : 0;
      await adjustUserCoins(userId, cashbackEarned, coinsRedeemed);
      await updateUserAddress(userId, shippingAddress);
    }

    // 3. Create Order
    const orderData = {
      id: mockOrderNum,
      userId: userId || null,
      date: timestamp,
      items: items.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0]
      })),
      totalAmount,
      paymentMethod: paymentMethod || 'N/A',
      paymentStatus: paymentStatus || 'Pending',
      status: 'Processing',
      shippingAddress,
      trackingTimeline: [
        { status: 'Ordered', time: timestamp, desc: 'Order placed and confirmed successfully.' },
        { status: 'Processing', time: timestamp, desc: getStatusDesc('Processing') }
      ]
    };

    const order = await createOrder(orderData);
    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
});

// @route   GET /api/orders
// @desc    Get order histories
router.get('/', async (req, res) => {
  const { userId } = req.query;

  try {
    const orders = await getOrders({ userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
});

// @route   PATCH /api/orders/:id/status
// @desc    Advance shipping progress timeline state (Admin only)
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;

  try {
    const timestamp = new Date().toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short'
    });

    const stepData = {
      status,
      time: timestamp,
      desc: getStatusDesc(status)
    };

    const order = await updateOrderStatusById(req.params.id, status, stepData);
    if (!order) {
      return res.status(404).json({ error: 'Not Found', message: 'Order to update not found.' });
    }

    res.json(order);

  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
});

export default router;
