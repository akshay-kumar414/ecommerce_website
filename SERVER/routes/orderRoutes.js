const express = require("express");
const router = express.Router();

const {
placeOrder,
getMyOrders,
getAllOrders,
updateOrderStatus
} = require("../controllers/orderController");

const { protect, authorize } = require("../middleware/authMiddleware");


// USER ROUTES
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);


// ADMIN ROUTES
router.get("/all", protect, authorize("admin"), getAllOrders);
router.put("/:id", protect, authorize("admin"), updateOrderStatus);


module.exports = router;