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
    default: null,
  },
  qrCodePublicId: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

ProductSchema.index({ qrCode: 1 }, { unique: false });

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
