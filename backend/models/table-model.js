const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  seatCapacity: {
    type: Number,
    require: true,
  },
});

module.exports = new mongoose.model("Table", tableSchema);
