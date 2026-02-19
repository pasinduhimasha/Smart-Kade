const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Create Admin
router.post("/create", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email exists
    if (await User.findOne({ email })) return res.status(400).json({ msg: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newAdmin = new User({ name, email, password: hashed, role: "admin" });
    await newAdmin.save();

    res.status(201).json({ msg: "Admin created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
