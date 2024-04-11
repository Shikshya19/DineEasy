const Order = require("../models/order-model");
const Menu = require("../models/menu-model");

exports.addOrder = async (req, res) => {
  try {
    const { orderItem } = req.body;
    const user = req.user;
    if ([orderItem].some((field) => !field)) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const item = await Menu.findById(orderItem);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    // If already added, increase the quantity
    const alreadyExist = await Order.findOne({
      user: user._id,
      orderItem,
    }).populate("orderItem");
    if (alreadyExist) {
      alreadyExist.quantity += 1;
      alreadyExist.total = alreadyExist.orderItem.price * alreadyExist.quantity;
      alreadyExist.save();
      return res.status(200).json({ msg: "Added successfully" });
    }
    const newOrder = await Order.create({ user, orderItem, total: item.price });
    res.status(201).json({
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to add order" });
  }
};
exports.getMyOrder = async (req, res) => {
  try {
    const user = req.user;
    const order = await Order.find({ user }).populate("orderItem");
    res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ msg: "Failed to add order" });
  }
};
exports.removeItem = async (req, res) => {
  try {
    const orderID = req.params.id;

    if (!orderID)
      return res.status(400).json({ msg: "All fields are required" });

    const order = await Order.findById(orderID);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    if (order.quantity === 1) {
      await Order.findByIdAndDelete(orderID);
      return res.status(200).json({ msg: "Removed successfully" });
    }
    order.quantity -= 1;
    await order.save();
    return res.status(200).json({ msg: "Removed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to delete order" });
  }
};
