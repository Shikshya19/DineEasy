const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: String,
    enum: ["Waiter", "Chef", "Cashier"],
    require: true,
  },
});

module.exports = new mongoose.model("Staff", staffSchema);
