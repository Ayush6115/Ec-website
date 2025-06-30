# 🛍️ MERN E-Commerce Frontend

This is the **React-based frontend** for a full-featured **MERN (MongoDB, Express, React, Node.js)** stack e-commerce application. It provides a modern shopping experience for users and a separate, secure admin dashboard for managing products, orders, and customer interactions.

---

## 🚀 Getting Started

### ✅ Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js) or **Yarn**

### 📦 Installation

Clone the repository and install dependencies:

```bash
cd frontend
npm install
```

### ▶️ Running the Development Server

To start the React frontend locally:

```bash
npm start
```

Once started, open your browser at:

```
http://localhost:3000
```

The frontend will interact with the backend running at `http://localhost:5000` by default.

---

## ⚙️ Tech Stack & Libraries

This project uses a simple yet powerful tech stack:

- **React (Hooks + Functional Components)** – Frontend framework
- **React Router v6** – Declarative routing and nested layouts
- **Axios** – Simplified HTTP requests to backend API
- **JWT (JSON Web Tokens)** – Token-based authentication (localStorage)
- **Plain CSS** – No preprocessors; scoped per component/page for maintainability

---

## 🧭 Project Structure

```
frontend/
├── public/                   # Static files (HTML, favicon)
├── src/
│   ├── admin/                # Admin-specific components, pages, and styles
│   │   ├── components/       # AdminNavbar, AdminFooter
│   │   ├── pages/            # Admin pages: product/order/message management
│   │   └── styles/           # CSS files for admin components
│   ├── components/           # Shared UI elements: Navbar, Footer, Cards, etc.
│   ├── pages/                # User-facing pages (Home, Cart, Profile, etc.)
│   ├── services/             # Axios instance and API utilities
│   ├── styles/               # CSS files for user components
│   ├── App.jsx               # Main routing file
│   ├── index.js              # Application entry point
│   └── index.css             # Global styles
├── .gitignore
├── package.json
└── README.md
```

### 🧩 Why this structure?

- **Separation of concerns**: Admin and user code are clearly divided.
- **Scalability**: Easily add features or refactor without confusion.
- **Reusable UI components**: Shared UI lives in `/components`.
- **Style isolation**: Each section has its own CSS directory.

---

## 🛣 Routing Structure

### 🔹 User Routes

| Path               | Component         | Description                          |
|--------------------|------------------|--------------------------------------|
| `/`                | `HomePage`       | Landing page with featured products  |
| `/login`           | `LoginPage`      | User login form                      |
| `/signup`          | `SignupPage`     | User registration                    |
| `/profile`         | `ProfilePage`    | Protected user profile page          |
| `/products`        | `AllProduct`     | View all products                    |
| `/men`             | `MensCategory`   | Filtered products for men            |
| `/women`           | `WomensCategory` | Filtered products for women          |
| `/kids`            | `KidsCategory`   | Filtered products for kids           |
| `/product/:id`     | `DetailedProduct`| Product detail page                  |
| `/cart`            | `Cart`           | View and manage shopping cart        |
| `/checkout`        | `Checkout`       | Enter shipping and billing info      |
| `/payment`         | `Payment`        | Payment integration page             |
| `/order-success`   | `OrderSuccess`   | Confirmation after successful order  |
| `/orders`          | `MyOrderPage`    | View past orders                     |
| `/contact`         | `ContactUs`      | Contact form                         |
| `/about`           | `AboutUs`        | About the store                      |
| `/login-admin`     | `AdminLoginPage` | Admin authentication page            |

### 🔸 Admin Routes (`/admin` prefix)

| Path                             | Component            | Description                        |
|----------------------------------|----------------------|------------------------------------|
| `/admin`                         | `AdminLayout`        | Admin dashboard layout             |
| `/admin/add-product`             | `AddProduct`         | Add new products                   |
| `/admin/update-product`          | `UpdateProduct`      | View and select product to update  |
| `/admin/update-product-form/:id` | `UpdateProductForm`  | Edit specific product              |
| `/admin/update-order`            | `UpdateOrder`        | View and manage all orders         |
| `/admin/update-order-form/:id`   | `UpdateOrderForm`    | Edit individual order              |
| `/admin/message`                 | `AllMessages`        | View and manage user messages      |

> Admin routes are rendered inside a separate layout (`AdminLayout`) and do **not** share the user-facing navigation or footer.

---

## 🔐 Authentication Flow

- **JWT Tokens** are used for both user and admin authentication.
- Tokens are saved in `localStorage`:
  - `token` → for users
  - `adminToken` → for admin users
- On every route change:
  - Tokens are decoded and checked for expiration
  - Invalid/expired tokens are cleared, and user is redirected to login
- **Protected Routes**:
  - Pages like `/profile`, `/orders`, and all `/admin` routes are protected
  - Access is only granted if a valid token is present

---

## 🌐 API Integration (`src/services/api.js`)

- Centralized Axios instance configured with:
  - `baseURL = http://localhost:5000/api`
  - `Authorization: Bearer <token>` header auto-attached when token is present
- On `401 Unauthorized` responses:
  - Token is removed from storage
  - User/admin is logged out and redirected to login

---

## 🧪 Testing

Basic tests included using React Testing Library.

### Run tests:

```bash
npm test
```

> You can expand the testing suite with component, integration, and E2E tests using tools like Jest, Cypress, or Vitest.

---

## 🧱 Build & Deployment

To generate a production-ready build:

```bash
npm run build
```

- Output will be saved in the `/build` directory.
- Deploy this folder to a static host like **Vercel**, **Netlify**, or integrate with **Node.js backend (Express)** as static assets.

---

## 🎨 Styling Approach

- **Plain CSS only**: No SASS/SCSS or CSS-in-JS
- CSS is scoped:
  - `/styles/` – for user interface
  - `/admin/styles/` – for admin-specific UI
- Global styles live in `index.css` and `App.css`
- Follows a simple **BEM-like** naming convention for readability

---

## 🧩 Key Components Overview

### 🔧 Shared Components

- `Navbar`, `Footer`
- `ProductCard`, `Carousel`, `Search`, `Testimonial`
- `FeaturedSectionCards`

### 🧍 User-Facing Pages

- Auth: `LoginPage`, `SignupPage`
- Product Flow: `HomePage`, `AllProduct`, `DetailedProduct`, `Cart`, `Checkout`, `Payment`
- Account: `ProfilePage`, `MyOrderPage`
- Informational: `AboutUs`, `ContactUs`, `OrderSuccess`

### 🛠 Admin Panel

- Auth: `AdminLoginPage`
- Products: `AddProduct`, `UpdateProduct`, `UpdateProductForm`
- Orders: `UpdateOrder`, `UpdateOrderForm`
- Messages: `AllMessages`
- Layout: `AdminNavbar`, `AdminFooter`, `AdminLayout`

---

## 📬 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change. Be sure to:

- Fork the repository
- Create your feature branch: `git checkout -b feature/your-feature-name`
- Commit your changes: `git commit -m 'Add some feature'`
- Push to the branch: `git push origin feature/your-feature-name`
- Submit a pull request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Developed By

**Ayush Ranjan** 
