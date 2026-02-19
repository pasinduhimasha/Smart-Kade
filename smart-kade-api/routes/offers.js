const express = require("express");
const router = express.Router();
const multer = require("multer");
const Offer = require("../models/Offer");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Get all offers
router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new offer (admin only)
router.post("/", authMiddleware, adminMiddleware, upload.single("imgFile"), async (req, res) => {
  try {
    const { text, price } = req.body; // get price from request
    const imgPath = req.file ? `/uploads/${req.file.filename}` : "";
    const newOffer = new Offer({ text, price, img: imgPath });
    await newOffer.save();
    res.status(201).json({ message: "Offer saved successfully", offer: newOffer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Update offer (admin only)
router.put("/:id", authMiddleware, adminMiddleware, upload.single("imgFile"), async (req, res) => {
  try {
    const { text, price } = req.body; // get price from request
    const updatedData = { text, price };
    if (req.file) updatedData.img = `/uploads/${req.file.filename}`;

    const updatedOffer = await Offer.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedOffer) return res.status(404).json({ message: "Offer not found" });

    res.json({ message: "Offer updated successfully", offer: updatedOffer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete offer (admin only)
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.id);
    if (!deletedOffer) return res.status(404).json({ message: "Offer not found" });
    res.json({ message: "Offer deleted successfully", offer: deletedOffer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
