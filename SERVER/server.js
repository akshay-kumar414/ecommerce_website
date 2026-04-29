const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

// ✅ DATABASE CONNECTION
connectDB();


// ✅ MIDDLEWARE
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// ✅ ROUTES IMPORT
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");


// ✅ ROUTES USE
app.use("/api/", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


// ✅ BASIC ROUTE
app.get("/", (req, res) => {
  res.send("LocalKart Backend Running 🚀");
});






// ✅ SERVER START
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
