const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/db');

const signupSchema = require('./validation/signupValidation');
const loginSchema = require('./validation/loginValidation');

// Routes
const authRoutes = require('./routes/auth.routes');
const messageRoutes = require('./routes/message.routes');
const profileRoutes = require('./routes/userProfile.routes');
const productsRoutes = require('./routes/products.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const adminAuthRoutes = require('./routes/adminAuth.routes');

// Middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api', authRoutes);
app.use('/api/admin', messageRoutes);
app.use('/api', profileRoutes);
app.use('/api/admin', productsRoutes);
app.use('/api', cartRoutes);
app.use('/api/admin', orderRoutes);
app.use('/api/admin', adminAuthRoutes);

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
