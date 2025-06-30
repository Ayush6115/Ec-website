const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware'); 
const Order = require('../models/order.model');
const User = require('../models/user');
const Cart = require('../models/cart.model');

// Place an order (User only)
router.post('/order', jwtMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { shippingInfo, paymentMethod } = req.body;

  if (!shippingInfo || !paymentMethod) {
    return res.status(400).json({ message: 'Missing shipping or payment information' });
  }

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    const order = new Order({
      userId,
      items: orderItems,
      shippingInfo,
      paymentMethod,
      status: 'Pending',
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch orders (User or Admin)
router.get('/orders', jwtMiddleware, async (req, res) => {
  try {
    let orders;

    if (req.user.isAdmin) {
      orders = await Order.find()
        .populate('userId', 'name email')
        .populate('items.productId', 'name price imageUrl')
        .sort({ createdAt: -1 });
    } else {
      const userId = req.user.id;
      orders = await Order.find({ userId })
        .populate('items.productId', 'name price imageUrl')
        .sort({ createdAt: -1 });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status (Admin only)
router.put('/orders/:id', adminMiddleware, async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Missing status in request body' });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
