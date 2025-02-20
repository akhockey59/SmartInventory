const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please enter product title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please enter product quantity'],
    min: 0,
  },
  category: {
    type: String,
    required: [true, 'Please enter product category'],
  },
  qrCode: {
    type: String,
    default: '',
  },
  qrCodePublicId: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
