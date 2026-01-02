const express = require("express");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/admin/users
//get all users(admin only)
// access private/admin

router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

//route POST /api/admin/users
// add a new user(admin only)
//  access private , admin
router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "already user exist" });
    }

    user = new User({
      name,
      email,
      password,
      role: role || "customer",
    });

    await user.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

// route PUT /api/admin/users/:id
// update user infp(admin only) -name , email and role
// access private/adimin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }
    const updatedUser = await user.save();
    res.json({
      message: "user updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

// router DELET /api/admin/users/:id
//delete user
// private/admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
