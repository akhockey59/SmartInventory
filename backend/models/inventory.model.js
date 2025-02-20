const mongoose = require("mongoose");

const InventoryTransactionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // 'add' or 'remove' to denote the transaction type
  type: {
    type: String,
    enum: ["add", "remove"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("InventoryTransaction", InventoryTransactionSchema);
