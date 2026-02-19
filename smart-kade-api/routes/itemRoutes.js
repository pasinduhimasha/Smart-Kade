const express = require("express");
const router = express.Router();
const multer = require("multer");
const Item = require("../models/Item");

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Add new item (ADMIN)
router.post("/", upload.single("imgFile"), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    if (!name || !price || !category) return res.status(400).json({ error: "Name, price, category required" });

    const imgPath = req.file ? `/uploads/${req.file.filename}` : "";

    const newItem = new Item({ name, price, category, description, img: imgPath });
    await newItem.save();

    res.status(201).json({ message: "Item saved successfully", item: newItem });
  } catch (error) {
    console.error("Error saving item:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get all items (public)
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Update item (ADMIN) with optional image
router.put("/:id", upload.single("imgFile"), async (req, res) => {
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

// Delete item (ADMIN)
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item deleted successfully", item: deletedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
