const express = require('express');
const router = express.Router();
const Message = require('../models/message.model');
const adminMiddleware = require('../middleware/adminMiddleware'); 

// Public: Post a message
router.post('/message', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newMessage = new Message({ name, email, message });
        const savedMessage = await newMessage.save();

        res.status(200).json({
            message: "Message Saved Successfully",
            response: savedMessage,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get all messages
router.get('/message', adminMiddleware, async (req, res) => {
    try {
        const allMessages = await Message.find();
        res.status(200).json({
            message: 'Messages successfully Fetched',
            response: allMessages,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Admin-only: Delete message
router.delete('/message/:id', adminMiddleware, async (req, res) => {
    try {
        const messageId = req.params.id;
        const deletedMessage = await Message.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({
                message: 'Message not found'
            });
        }

        res.status(200).json({
            message: 'Message Successfully Deleted',
            response: deletedMessage,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
