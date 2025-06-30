const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const signupSchema = require('../validation/signupValidation')
const loginSchema = require('../validation/loginValidation')
const User = require('../models/user')

//Secret Key
const jwtSecretKey = process.env.SECRET_KEY

//Login Post Method
router.post('/login', async (req, res) => {
    const { error, value } = loginSchema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    const { email, password } = value;

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const jwtToken = jwt.sign({
            id: user.id,
            email: user.email,
            isAdmin: false
        },
            jwtSecretKey,
            { expiresIn: '1d' }
        )

        res.status(200).json({
            message: 'Login successful',
            token: jwtToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


//Signup Post method
router.post('/signup', async (req, res) => {

    const { error, value } = signupSchema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    try {
        const { name, phone, email, password } = value
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, phone, email, password: hashedPassword })
        const savedUser = await newUser.save()

        res.status(200).json({
            message: "User Saved Successfully",
            response: savedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router
