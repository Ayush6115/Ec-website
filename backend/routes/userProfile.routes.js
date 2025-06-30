const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwtMiddleware = require('../middleware/authMiddleware');

// GET Profile (Authenticated)
router.get('/profile', jwtMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const userProfile = await User.findById(userId).select('-password');

    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile successfully fetched',
      user: userProfile,
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// UPDATE Profile (Authenticated)
router.put('/update-profile', jwtMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone } = req.body;

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (phone) updatedFields.phone = phone;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedFields,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile successfully updated',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
