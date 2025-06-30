const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.model');
const Products = require('../models/products.model');
const jwtMiddleware = require('../middleware/authMiddleware');

// Add to Cart API
router.post('/cart/add', jwtMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
    } else {
      const item = cart.items.find(item => item.productId.equals(productId));

      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();

    // Return populated cart
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.productId', 'name price imageUrl description');

    res.status(200).json({
      message: 'Product added to cart successfully',
      cart: populatedCart
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get Cart API
router.get('/cart', jwtMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price imageUrl description');

    if (!cart) {
      return res.status(200).json({ message: 'Cart is empty', cart: { items: [] } });
    }

    res.status(200).json({
      message: 'Cart fetched successfully',
      cart,
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Remove item from cart API
router.delete('/cart/remove', jwtMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.productId', 'name price imageUrl description');

    res.status(200).json({ message: 'Item removed', cart: populatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update item from cart API
router.patch('/cart/update', jwtMiddleware, async (req, res) => {

  const userId = req.user.id;

  const { productId, quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1' });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: 'Product not in cart' });
    }

    item.quantity = quantity;
    await cart.save();

    const populatedCart = await Cart.findById(cart._id)
      .populate('items.productId', 'name price imageUrl description');

    res.status(200).json({
      message: 'Quantity updated successfully',
      cart: populatedCart
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
