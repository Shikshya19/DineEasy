const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Menu", menuSchema);
