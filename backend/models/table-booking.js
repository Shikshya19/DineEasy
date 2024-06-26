const mongoose = require("mongoose");

const tableBooking = new mongoose.Schema({
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  event: {
    type: String,
    default: "Regular",
  },
});

module.exports = new mongoose.model("TableBooking", tableBooking);
