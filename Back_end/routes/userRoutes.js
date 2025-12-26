const express = require("express");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware.js");
const router = express.Router();

//route post /api/users/register
// @desc register new user,
// @access Public
router.post("/register", async (req, res) => {
  const { name, email, password,role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        message: "User already exists",
      });
    user = new User({ name, email, password,role });
    await user.save();

    // CREATE JWT PAYLOAD
    const payload = { user: { id: user._id, role: user.role } };

    // sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// route post/api/users/login
// authenticate user
// access public

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //find the user
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "account not exits",
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invaild credentails",
      });
    }

    // CREATE JWT PAYLOAD
    const payload = { user: { id: user._id, role: user.role } };
    // sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        res.status(200).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// route GET api/users/profile
//@desc get logged in user's profile(prodtect route)
//access private

router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
