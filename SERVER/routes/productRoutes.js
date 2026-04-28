const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ✅ GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ ADD product (MAIN 🔥)
router.post("/", async (req, res) => {
  try {
    const { name, price, description, category, stock, image } = req.body;

    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      image
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;