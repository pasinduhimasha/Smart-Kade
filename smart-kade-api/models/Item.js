// models/Item.js
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },      // Food category
  price: { type: Number, required: true },
  img: { type: String, default: "" },             // Image URL
  description: { type: String, default: "" },     // Optional description
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Item", ItemSchema);
