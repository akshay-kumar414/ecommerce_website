const Order = require("../models/Order");
const Cart = require("../models/Cart");

const placeOrder = async (req, res) => {
  try {
    const cart = await Cart
      .findOne({ user: req.user.id })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    let totalPrice = 0;

    const validItems = cart.items.filter(item => item.product !== null);

    if (validItems.length === 0) {
      return res.status(400).json({
        message: "All products in cart are invalid or deleted"
      });
    }

    const orderItems = validItems.map(item => {
      totalPrice += item.quantity * item.product.price;

      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      };
    });

    // ✅ Create Order
    const order = await Order.create({
      user: req.user.id,
      orderItems,
      totalPrice
    });

    // 🧹 Clear Cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.log("🔥 ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// 👤 GET MY ORDERS
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order
      .find({ user: req.user.id })
      .populate("orderItems.product");

    res.json(orders);

  } catch (error) {
    console.log("🔥 ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// 👑 ADMIN: GET ALL ORDERS
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order
      .find({})
      .populate("orderItems.product");

    res.json(orders);

  } catch (error) {
    console.log("🔥 ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// 🔄 ADMIN: UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.status = req.body.status || order.status;

    await order.save();

    res.json({
      message: "Order status updated",
      order
    });

  } catch (error) {
    console.log("🔥 ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
};