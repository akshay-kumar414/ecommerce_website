# LocalKart MongoDB Setup Guide

## ✅ Fixes Applied

### 1. **Added bcryptjs to Dependencies** 
**File**: `SERVER/package.json`
- Added `"bcryptjs": "^2.4.3"` to dependencies
- **Why**: Required for secure password hashing in authentication
- **Status**: ✅ Fixed

### 2. **Fixed JWT Secret Configuration** 
**File**: `SERVER/controllers/authController.js` (line 50)
- **Before**: Hard-coded `"mysecretkey123"`
- **After**: Now uses `process.env.JWT_SECRET` from `.env` file
- **Why**: Security best practice to avoid exposing secrets in code
- **Status**: ✅ Fixed

### 3. **Optimized Database Connection** 
**File**: `SERVER/server.js`
- **Before**: Direct `mongoose.connect()` call in server.js
- **After**: Uses dedicated `connectDB()` function from `config/db.js`
- **Why**: Better separation of concerns and cleaner code structure
- **Status**: ✅ Fixed

### 4. **Verified Environment Variables**
**File**: `SERVER/.env`
```
MONGO_URI=mongodb+srv://akshayjann02_db_user:akhshayjann@cluster0.suck2cd.mongodb.net/localkart?retryWrites=true&w=majority
JWT_SECRET=mysecretkey123
PORT=5000
```
- ✅ MongoDB Atlas connection URI configured
- ✅ JWT secret configured and now being used
- ✅ Port configured to 5000

---

## 🚀 How to Start the Server

### Step 1: Install Dependencies
```bash
cd "C:\Users\AKSHAY\OneDrive\Desktop\PROJECT (LOCAL KART)\SERVER"
npm install
```

### Step 2: Start the Server
```bash
npm start
```

**Expected Output**:
```
Database Connected ✅
🚀 Server started on port 5000
```

---

## 📊 MongoDB Database Structure

### Collections That Will Be Created:

#### 1. **Users Collection**
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed with bcrypt, required),
  role: String (enum: ["customer", "vendor", "admin"], default: "customer"),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### 2. **Products Collection**
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: Number (required),
  category: String (required),
  stock: Number (default: 0),
  image: String (default: placeholder),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### 3. **Carts Collection**
```javascript
{
  _id: ObjectId,
  user: ObjectId (references User),
  items: [
    {
      product: ObjectId (references Product),
      quantity: Number (min: 1)
    }
  ],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### 4. **Orders Collection**
```javascript
{
  _id: ObjectId,
  user: ObjectId (references User),
  orderItems: [
    {
      product: ObjectId (references Product),
      quantity: Number,
      price: Number
    }
  ],
  totalPrice: Number (required),
  status: String (default: "Pending"),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🔌 API Endpoints (Now with MongoDB)

### Authentication
```
POST /api/auth/register     - Register new user
POST /api/auth/login        - Login user (returns JWT token)
```

### Products
```
GET  /api/products          - Get all products
POST /api/products          - Add new product
```

### Cart (Protected - requires JWT token)
```
GET    /api/cart            - Get user's cart
POST   /api/cart            - Add product to cart
PUT    /api/cart            - Update cart item quantity
DELETE /api/cart            - Remove item from cart
DELETE /api/cart/clear      - Clear entire cart
```

### Orders (Protected - requires JWT token)
```
POST   /api/orders          - Place order
GET    /api/orders/my       - Get my orders
GET    /api/orders/all      - Get all orders (admin only)
PUT    /api/orders/:id      - Update order status (admin only)
```

---

## 🧪 Test the Setup

### 1. Test MongoDB Connection
The server will automatically log:
```
Database Connected ✅
```

### 2. Test User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Test Product Creation
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 50000,
    "category": "Electronics",
    "stock": 10,
    "image": "https://example.com/laptop.jpg"
  }'
```

### 4. Check MongoDB Data
Visit your MongoDB Atlas cluster: https://cloud.mongodb.com
- Database: `localkart`
- Collections: `users`, `products`, `carts`, `orders`

---

## ⚠️ Important Notes

1. **bcryptjs Installation**: Make sure to run `npm install` after the fix to get bcryptjs
2. **JWT Token**: Keep JWT_SECRET secure and never commit secrets to git
3. **MongoDB Atlas**: Your connection string already has credentials - be careful not to share it publicly
4. **CORS**: Currently configured to allow all origins - consider restricting in production
5. **Authentication**: All cart and order operations require valid JWT token in Authorization header

---

## 🛠️ Troubleshooting

### Database Connection Failed
- ✅ Check `.env` file has `MONGO_URI`
- ✅ Verify MongoDB Atlas cluster is running
- ✅ Check IP whitelist in MongoDB Atlas security settings
- ✅ Verify credentials in connection string

### bcryptjs Not Found
```bash
npm install bcryptjs
```

### JWT Token Errors
- Ensure `JWT_SECRET` is set in `.env`
- Use token in Authorization header: `Bearer <token>`

### Password Not Hashing
- Verify bcryptjs is installed
- Check that `authController.js` uses bcrypt

---

## ✨ What Was Changed

| File | Change | Reason |
|------|--------|--------|
| `package.json` | Added bcryptjs | Password hashing dependency |
| `authController.js` | Use `process.env.JWT_SECRET` | Security - no hard-coded secrets |
| `server.js` | Use `connectDB()` function | Cleaner code structure |

All data will now be persisted in your MongoDB Atlas database! 🎉
