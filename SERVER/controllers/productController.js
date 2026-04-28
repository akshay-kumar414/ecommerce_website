const Product = require("../models/Product");


// GET ALL PRODUCTS
const getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.json({
      products,
      page: 1,
      pages: 1
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};



// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};



// ADD PRODUCT
const addProduct = async (req, res) => {

  try {

    const { name, description, price, category, stock } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      vendor: req.user.id
    });

    res.status(201).json({
      message: "Product added",
      product
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};



// UPDATE PRODUCT
const updateProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;

    const updatedProduct = await product.save();

    res.json(updatedProduct);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};



// DELETE PRODUCT
const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};



module.exports = {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct
};