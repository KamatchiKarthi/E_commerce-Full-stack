const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//route GET /api/orders/my-orders
// Get logged-in users orders
// access private

router.get("/my-orders", protect, async (req, res) => {
  try {
    // find orders fot the aunthenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

// route GET /api/orders/:id
// get order details by ID
// access private

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res.status(404).json({
        message: "order not found",
      });
    }

    //return the full order details
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
