const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        itemName: {
          type: String,
          require: true,
        },
        price: {
          type: Number,
          default: 1,
        },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
    total: {
      type: Number,
      require: true,
    },
    prepared: {
      type: Boolean,
      default: false,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    pidx: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Order", orderSchema);
