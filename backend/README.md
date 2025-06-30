🇯🇵 [日本語のREADMEはこちら](README.ja.md)

# 🛍️ MERN E-Commerce Backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)

This is the **backend** of a full-featured e-commerce platform built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It provides REST APIs for user and admin authentication, product management, shopping cart, order processing, contact messages, and profile updates.

---

## ⚙️ Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for APIs
- **MongoDB** – NoSQL document database
- **Mongoose** – MongoDB ODM (object modeling)
- **JWT** – Authentication using JSON Web Tokens
- **Joi** – Data validation for incoming requests
- **Bcrypt** – Secure password hashing

---

## 📁 Folder Structure

```
backend/
├── config/                     # Database config
│   └── db.js
├── middleware/                # Auth middlewares
│   ├── authMiddleware.js
│   └── adminMiddleware.js
├── models/                    # Mongoose models
│   ├── admin.js
│   ├── cart.model.js
│   ├── message.model.js
│   ├── order.model.js
│   ├── products.model.js
│   └── user.js
├── routes/                    # API route handlers
│   ├── adminAuth.routes.js
│   ├── auth.routes.js
│   ├── cart.routes.js
│   ├── message.routes.js
│   ├── order.routes.js
│   ├── products.routes.js
│   └── userProfile.routes.js
├── validation/                # Request validation schemas
│   ├── loginValidation.js
│   └── signupValidation.js
├── .env                       # Environment variables
├── index.js                   # Server entry point
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ayush6115/Ec-website
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the `backend/` folder:

```env
MONGO_URL=your_mongo_connection_string
SECRET_KEY=your_jwt_secret
```

### 4. Start the Server

```bash
node index.js
# or use nodemon for development
npx nodemon index.js
```

The server runs at:  
📍 `http://localhost:5000`

---

## 🔒 Authentication

- Uses **JWT tokens** for both users and admins.
- Tokens are expected in headers as:

```http
Authorization: Bearer <token>
```

---

## 🧪 Validation

- Validation is performed using **Joi** schemas:
  - `signupValidation.js` – Validates name, phone, email, password
  - `loginValidation.js` – Validates email and password

---

## 👤 User APIs (`/api`)

| Endpoint           | Method | Description             | Auth Required  |
|--------------------|--------|-------------------------|----------------|
| `/signup`          | POST   | Register a new user     | ❌             |
| `/login`           | POST   | Log in a user           | ❌             |
| `/profile`         | GET    | Get user profile        | ✅             |
| `/update-profile`  | PUT    | Update user profile     | ✅             |

---

## 🛒 Cart APIs (`/api/cart`)

| Endpoint     | Method | Description             | Auth Required  |
|--------------|--------|-------------------------|----------------|
| `/add`       | POST   | Add item to cart        | ✅             |
| `/`          | GET    | Get user's cart         | ✅             |
| `/update`    | PATCH  | Update item quantity    | ✅             |
| `/remove`    | DELETE | Remove item from cart   | ✅             |

---

## 📦 Order APIs

| Endpoint               | Method | Description                  | Auth Required     |
|------------------------|--------|------------------------------|-------------------|
| `/order`               | POST   | Place an order (User)        | ✅ (User)         |
| `/orders`              | GET    | Get all orders               | ✅ (User/Admin)   |
| `/orders/:id`          | PUT    | Update order status          | ✅ (Admin only)   |

---

## 📬 Message APIs

| Endpoint         | Method | Description                  | Auth Required |
|------------------|--------|------------------------------|---------------|
| `/message`       | POST   | Submit a contact message     | ❌            |
| `/message`       | GET    | Get all messages (Admin)     | ✅ (Admin)    |
| `/message/:id`   | DELETE | Delete a specific message    | ✅ (Admin)    |

---

## 🛍️ Product APIs

### 🔧 Admin Product APIs (`/api/admin`)

| Endpoint                | Method | Description              | Auth Required |
|-------------------------|--------|--------------------------|---------------|
| `/add-product`          | POST   | Add a new product        | ✅ (Admin)    |
| `/update-product/:id`   | PUT    | Update a product         | ✅ (Admin)    |
| `/products/:id`         | DELETE | Delete a product         | ✅ (Admin)    |

### 🌐 Public Product APIs (`/api`)

| Endpoint                           | Method | Description                 |
|------------------------------------|--------|-----------------------------|
| `/products`                        | GET    | Get all products            |
| `/products/:id`                    | GET    | Get product by ID           |
| `/products/category/men`          | GET    | Get men’s category items    |
| `/products/category/women`        | GET    | Get women’s category items  |
| `/products/category/kids`         | GET    | Get kids’ category items    |

---

## 🔐 Middleware

### `authMiddleware.js`

- Verifies JWT token for user routes.
- Adds `req.user` if valid.

### `adminMiddleware.js`

- Verifies admin token and access level.
- Adds `req.admin` if authorized.

---

## 🧬 Data Models Overview

### 1. `User`
```js
{
  name,
  phone,
  email,
  password
}
```

### 2. `Admin`
```js
{
  name,
  phone,
  email,
  password
}
```

### 3. `Product`
```js
{
  name,
  description,
  price,
  category,
  imageUrl,
  stock,
  createdAt
}
```

### 4. `Cart`
```js
{
  userId,
  items: [
    { productId, quantity }
  ]
}
```

### 5. `Order`
```js
{
  userId,
  items,
  shippingInfo,
  paymentMethod,
  status
}
```

### 6. `Message`
```js
{
  name,
  email,
  message
}
```

---

## 🧪 Recommended Tools for Testing

- 🔍 **[Postman](https://www.postman.com/)** – For API testing
- ☁️ **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** – Cloud-based database GUI
- 📋 **[JWT.io](https://jwt.io/)** – Decode and verify tokens

---

## 📌 Future Improvements

- Image upload with cloud storage (e.g., Cloudinary)
- Pagination and filtering in product listings
- Admin analytics dashboard (charts, KPIs)
- Email notifications (order confirmation, status updates)
- Role-based access control

---

## 👨‍💻 Developed By

**Ayush Ranjan**  
GitHub: [@ayush6115](https://github.com/ayush6115)

---
