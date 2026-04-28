const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getCart);

router.post("/", protect, addToCart);

router.put("/", protect, updateCartItem);

router.delete("/", protect, removeCartItem);

router.delete("/clear", protect, clearCart);

module.exports = router;