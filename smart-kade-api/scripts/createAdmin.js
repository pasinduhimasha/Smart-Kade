const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/smartkade")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Create new admin
const createAdmin = async () => {
  try {
    const email = "admin@gmail.com";
    const password = "123456";
    const name = "Admin";

    // Check if admin already exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("Admin already exists!");
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save admin
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();
    console.log("Admin created successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
