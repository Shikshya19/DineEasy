const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orderItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    require: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

module.exports = new mongoose.model("Order", orderSchema);
