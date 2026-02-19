const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  text: { type: String, required: true },
  price: { type: Number, required: true, default: 0 }, // added price field
  img: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Offer", offerSchema);
