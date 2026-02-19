// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Parser } = require("json2csv");
const multer = require("multer");
require("dotenv").config();

// Models
const Item = require("./models/Item");

// Routes
const authRoutes = require("./routes/auth");
const adminAuthRoutes = require("./routes/adminAuth");
const offerRoutes = require("./routes/offers"); // New Offers route

// Middleware
const authMiddleware = require("./middleware/auth");
const adminMiddleware = require("./middleware/admin");

const app = express();

// ======= MIDDLEWARE =======
app.use(express.json());
app.use(cors());

// === Serve uploaded images ===
app.use("/uploads", express.static("uploads"));

// === MULTER CONFIG FOR FILE UPLOAD ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // folder for uploaded images
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ======= ROUTES =======
app.use("/api/auth", authRoutes);       // user login/register
app.use("/api/admin", adminAuthRoutes); // admin login/create
app.use("/api/offers", offerRoutes);    // offers CRUD

// ======= MONGODB CONNECTION =======
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/smartkade";

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// ======= TEST ROUTE =======
app.get("/", (req, res) => res.send("API running..."));

// ================= ITEMS CRUD =================

// Add new item (ADMIN only) with image
app.post("/api/items", authMiddleware, adminMiddleware, upload.single("imgFile"), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const imgPath = req.file ? `/uploads/${req.file.filename}` : "";

    const newItem = new Item({ name, price, category, description, img: imgPath });
    await newItem.save();
    res.status(201).json({ message: "Item saved successfully", item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get all items (public)
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Download JSON
app.get("/api/items/download/json", async (req, res) => {
  try {
    const items = await Item.find();
    res.setHeader("Content-Disposition", "attachment; filename=items.json");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(items, null, 2));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Download CSV
app.get("/api/items/download/csv", async (req, res) => {
  try {
    const items = await Item.find().lean();
    const fields = ["_id", "name", "price", "category", "description", "img", "createdAt"];
    const parser = new Parser({ fields });
    const csv = parser.parse(items);

    res.setHeader("Content-Disposition", "attachment; filename=items.csv");
    res.setHeader("Content-Type", "text/csv");
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Update item (ADMIN only) with optional image
app.put("/api/items/:id", authMiddleware, adminMiddleware, upload.single("imgFile"), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const updatedData = { name, price, category, description };
    if (req.file) updatedData.img = `/uploads/${req.file.filename}`;

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true });
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete item (ADMIN only)
app.delete("/api/items/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item deleted successfully", item: deletedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
