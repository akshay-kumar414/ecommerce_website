const Cart = require("../models/Cart");

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }]
      });
    } else {

      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    res.json({ message: "Product added to cart", cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET CART
const getCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({ user: req.user.id })
      .populate("items.product");

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE CART
const updateCartItem = async (req, res) => {
  try {

    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    const item = cart.items.find(
      item => item.product.toString() === productId
    );

    item.quantity = quantity;

    await cart.save();

    res.json({ message: "Cart updated", cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// REMOVE ITEM
const removeCartItem = async (req, res) => {
  try {

    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();

    res.json({ message: "Item removed", cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// CLEAR CART
const clearCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({ user: req.user.id });

    cart.items = [];

    await cart.save();

    res.json({ message: "Cart cleared", cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart
};