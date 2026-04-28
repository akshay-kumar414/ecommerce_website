# 🛒 FreshMart — Full Stack Grocery E-Commerce Website

![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/freshmart)
![GitHub stars](https://img.shields.io/github/stars/yourusername/freshmart?style=social)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)

> A fully functional, responsive grocery e-commerce web application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). Users can browse products, manage their cart, and place orders — while admins can manage inventory and track all orders from a dedicated dashboard.

---

## 📌 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Authentication Flow](#-authentication-flow-jwt)
- [Project Workflow](#-project-workflow)
- [API Overview](#-api-overview)
- [Future Scope](#-future-scope)
- [Challenges Faced](#-challenges-faced)
- [Conclusion](#-conclusion)
- [Author](#-author)
- [License](#-license)

---

## 📖 Introduction

**FreshMart** is a full-stack grocery e-commerce platform designed to make online grocery shopping simple and convenient. It allows customers to register, log in, browse a wide variety of grocery products, add items to their cart, and place orders — all from one clean and easy-to-use interface.

On the other side, administrators have access to a dedicated dashboard where they can add new products, update stock, and manage all customer orders.

This project was built as a learning exercise to understand how real-world full-stack applications are developed, using industry-standard tools like React.js, Node.js, Express.js, MongoDB, and JWT-based authentication.

---

## ✨ Features

### 👤 User Features
- 📝 Register and log in securely with JWT authentication
- 🔐 Stay logged in across sessions using tokens stored in localStorage
- 🛍️ Browse all available grocery products with images, prices, and categories
- 🔍 Search products by name or category
- 🛒 Add, remove, or update quantities in the shopping cart
- 📦 Place orders and view order history
- 👤 View and update personal profile information
- 📱 Responsive UI — works on mobile, tablet, and desktop

### 🛠️ Admin Features
- 🔑 Separate admin login with role-based access control
- ➕ Add new products with name, image, price, category, and stock quantity
- ✏️ Edit or delete existing products
- 📋 View all customer orders and update their status (Pending → Processing → Delivered)
- 👥 View all registered users
- 📊 Basic dashboard with product and order summary

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, React Router DOM, Axios, CSS Modules |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JSON Web Token (JWT), bcryptjs |
| **State Management** | React Context API |
| **Dev Tools** | Nodemon, dotenv, Postman (API testing) |

---

## 📁 Project Structure

```
freshmart/
│
├── client/                     # React.js Frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── assets/             # Images, icons
│       ├── components/         # Reusable UI components (Navbar, Footer, etc.)
│       ├── context/            # React Context for auth and cart state
│       ├── pages/              # Page components (Home, Login, Cart, etc.)
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Products.jsx
│       │   ├── Cart.jsx
│       │   ├── Orders.jsx
│       │   └── admin/
│       │       ├── Dashboard.jsx
│       │       ├── ManageProducts.jsx
│       │       └── ManageOrders.jsx
│       ├── App.jsx
│       └── main.jsx
│
├── server/                     # Node.js + Express.js Backend
│   ├── config/
│   │   └── db.js               # MongoDB connection setup
│   ├── controllers/            # Business logic for each route
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification middleware
│   │   └── adminMiddleware.js  # Admin role check middleware
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/                 # Express route definitions
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   └── index.js                # App entry point
│
├── .env                        # Environment variables (not committed to Git)
├── .gitignore
├── package.json                # Root package (or separate for client/server)
└── README.md
```

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally on your machine.

### ✅ Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or use MongoDB Atlas)
- [Git](https://git-scm.com/)

---

### 📥 Step 1 — Clone the Repository

```bash
git clone https://github.com/yourusername/freshmart.git
cd freshmart
```

---

### 🖥️ Step 2 — Set Up the Backend (Server)

```bash
# Navigate to the server directory
cd server

# Install backend dependencies
npm install

# Create a .env file (see Environment Variables section below)
touch .env
```

Start the backend server:

```bash
# Development mode with auto-restart
npm run dev

# OR normal start
npm start
```

The backend will run on: `http://localhost:5000`

---

### 🌐 Step 3 — Set Up the Frontend (Client)

Open a new terminal window:

```bash
# Navigate to the client directory
cd client

# Install frontend dependencies
npm install

# Start the React development server
npm run dev
```

The frontend will run on: `http://localhost:5173`

---

### 🗃️ Step 4 — Set Up MongoDB

If you're using **MongoDB Atlas** (recommended for beginners):
1. Create a free account at [mongodb.com](https://mongodb.com)
2. Create a new cluster
3. Get your connection string (it looks like `mongodb+srv://...`)
4. Paste it as the value of `MONGO_URI` in your `.env` file

If you're using a **local MongoDB** installation:
```
MONGO_URI=mongodb://localhost:27017/freshmart
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `/server` directory and add the following:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/freshmart

# JWT Secret Key (use any long random string)
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Admin Setup (optional — used to seed an admin account)
ADMIN_EMAIL=admin@freshmart.com
ADMIN_PASSWORD=Admin@12345
```

> ⚠️ **Important:** Never share your `.env` file or push it to GitHub. It's already listed in `.gitignore`.

---

## 🔑 Authentication Flow (JWT)

This project uses **JSON Web Tokens (JWT)** for secure authentication. Here's how it works:

```
1. User fills in the Register / Login form on the frontend.

2. The frontend sends a POST request to the backend with the credentials.

3. The backend verifies the credentials:
   - For Login: checks if the email exists and the password matches (using bcrypt).
   - For Register: hashes the password with bcrypt and saves the new user to MongoDB.

4. If credentials are valid, the backend generates a JWT token:
   const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

5. The token is sent back to the frontend in the response.

6. The frontend stores this token in localStorage.

7. On every subsequent request (e.g., placing an order), the frontend attaches
   the token in the request header:
   Authorization: Bearer <token>

8. The backend middleware verifies the token before allowing access to protected routes:
   - Valid token → Request proceeds ✅
   - Invalid or missing token → 401 Unauthorized ❌

9. Admin routes check for an additional `role: 'admin'` field inside the token.
```

This approach keeps the backend **stateless** — no sessions are stored on the server, which makes it easier to scale.

---

## 🔄 Project Workflow

Here's the step-by-step journey of a typical user on FreshMart:

```
Step 1 → User visits the website and lands on the Home Page.
          Featured products and categories are displayed.

Step 2 → User clicks "Register" and creates an account
          (name, email, password). Password is hashed before saving.

Step 3 → User logs in with their credentials.
          A JWT token is generated and stored in the browser.

Step 4 → User browses the Products Page.
          They can filter by category or search by name.

Step 5 → User clicks on a product and adds it to their Cart.
          Cart state is managed using React Context API.

Step 6 → User reviews the cart, adjusts quantities, and proceeds to checkout.

Step 7 → User confirms the order.
          Order details (user ID, products, total price, status) are
          saved to MongoDB. Cart is cleared.

Step 8 → User can view all past orders on the "My Orders" page.

Step 9 → Admin logs into the Admin Dashboard.
          Admin can see all orders, update their delivery status,
          and manage the product catalogue.
```

---

## 📡 API Overview

Base URL: `http://localhost:5000/api`

### 🔐 Auth Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | Public |
| POST | `/auth/login` | Login and receive JWT token | Public |
| GET | `/auth/profile` | Get logged-in user's profile | Private |

### 🥦 Product Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/products` | Get all products | Public |
| GET | `/products/:id` | Get a single product by ID | Public |
| POST | `/products` | Add a new product | Admin Only |
| PUT | `/products/:id` | Update product details | Admin Only |
| DELETE | `/products/:id` | Delete a product | Admin Only |

### 📦 Order Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/orders` | Place a new order | Private |
| GET | `/orders/my` | Get orders for logged-in user | Private |
| GET | `/orders` | Get all orders | Admin Only |
| PUT | `/orders/:id/status` | Update order delivery status | Admin Only |

### 👥 User Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/users` | Get all users | Admin Only |
| DELETE | `/users/:id` | Delete a user | Admin Only |

> 💡 **Tip:** Use [Postman](https://www.postman.com/) to test these endpoints during development. Pass the JWT token in the `Authorization` header as `Bearer <your_token>`.

---

## 🚀 Future Scope

This project has a solid foundation. Here are features planned or possible for future versions:

- 💳 **Payment Gateway Integration** — Add Razorpay or Stripe to handle real online payments securely.
- 📍 **Real-Time Order Tracking** — Use Socket.io or Google Maps API to show live delivery location on a map.
- 📱 **Mobile App** — Convert the frontend into a React Native app for Android and iOS.
- 🔔 **Push Notifications** — Notify users when their order is shipped or delivered using Firebase Cloud Messaging.
- 🌟 **Product Reviews & Ratings** — Let users rate and review products after purchase.
- 🤖 **AI Product Recommendations** — Suggest products to users based on their browsing and order history.
- 🌍 **Multi-language Support** — Add support for regional languages using i18n libraries.
- 📦 **Inventory Alerts** — Auto-notify admin when a product goes out of stock.

---

## 🧩 Challenges Faced

These are some real challenges encountered while building this project:

1. **JWT Token Expiry Handling** — Managing what happens when a user's token expires mid-session. Solved by checking the token on every page load and redirecting to login if it's expired.

2. **Cart State Management** — Keeping the cart consistent across multiple components without Redux. Solved by using React Context API with `useReducer`.

3. **Role-Based Access Control** — Making sure admin routes are completely inaccessible to regular users — both on the frontend (hiding UI) and backend (middleware checks).

4. **CORS Issues** — The browser blocked API calls from the React frontend (port 5173) to the Express backend (port 5000). Fixed by configuring the `cors` package on the server.

5. **MongoDB Schema Design** — Deciding how to store order data (especially embedded product info vs. references) was tricky. We chose to store a snapshot of product details at time of purchase to prevent order history from changing when products are updated.

6. **Responsive Design** — Making the product grid and cart look good on both mobile and desktop took several iterations with CSS Flexbox and Media Queries.

---

## ✅ Conclusion

**FreshMart** is a complete, end-to-end grocery e-commerce web application that demonstrates the full power of the MERN stack. It covers everything from user authentication and database design to REST API development and responsive frontend UI.

This project helped in deeply understanding how different layers of a web application communicate with each other — from the React frontend sending requests, to Express middleware validating JWT tokens, to MongoDB storing and retrieving data.

It is an ideal project for students looking to understand real-world full-stack development concepts and build something meaningful to showcase in their portfolio.

---

## 👨‍💻 Author

**Your Name**
- 🌐 Portfolio: [yourportfolio.com](https://yourportfolio.com)
- 💼 LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- 🐙 GitHub: [@yourusername](https://github.com/yourusername)
- 📧 Email: youremail@example.com

> Feel free to connect for collaboration, feedback, or just a chat about web development! 😊

---

## 📄 License

This project is licensed under the **MIT License** — you are free to use, modify, and distribute this project for personal or commercial purposes.

See the [LICENSE](./LICENSE) file for more details.

---

<p align="center">
  Made with ❤️ and lots of ☕ by <strong>Your Name</strong>
</p>

<p align="center">
  ⭐ If you found this project helpful, please give it a star on GitHub! It motivates a lot.
</p>
