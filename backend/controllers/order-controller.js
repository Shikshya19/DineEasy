const Order = require("../models/order-model");
const Menu = require("../models/menu-model");
const constants = require("../constants");
const Staff = require("../models/staff-model");

exports.addOrder = async (req, res) => {
  try {
    const { orderItem } = req.body;
    const user = req.user;
    if (user.role !== constants.user.roles.CUSTOMER)
      return res.status(403).json({ msg: "Only customer can place order" });
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
    console.log(orderID);

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
exports.getOrders = async (req, res) => {
  const user = req.user;
  try {
    let orders;
    if (user.role === constants.user.roles.STAFF) {
      const staff = await Staff.findOne({ user: user._id });
      if (!staff) return res.status(404).json({ msg: "No such staff" });

      switch (staff.post) {
        case constants.staff.posts.CHEF:
          orders = await Order.find({ prepared: false, delivered: false })
            .populate("orderItem")
            .populate("user");
          break;
        case constants.staff.posts.WAITER:
          orders = await Order.find({ prepared: true, delivered: false })
            .populate("orderItem")
            .populate("user");
          break;
        default:
          orders = await Order.find().populate("orderItem").populate("user");
      }
    } else {
      orders = await Order.find({ paid: true })
        .populate("orderItem")
        .populate("user");
    }
    res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ msg: "Failed to add order" });
  }
};
exports.markPrepared = async (req, res) => {
  const { orderId } = req.params;
  const user = req.user;
  if (user.role !== constants.user.roles.STAFF)
    return res.status(403).json({ msg: "Only staff are allowed" });

  try {
    const staff = await Staff.findOne({ user: user._id });
    if (!staff) return res.status(404).json({ msg: "Staff not found" });
    if (staff.post !== constants.staff.posts.CHEF)
      return res.status(403).json({ msg: "Only chef can mark prepared" });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    order.prepared = true;
    await order.save();

    return res.status(200).json({ msg: "Marked prepared successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Failed to delete order" });
  }
};
exports.markDelivered = async (req, res) => {
  const { orderId } = req.params;
  const user = req.user;

  if (user.role !== constants.user.roles.STAFF)
    return res.status(403).json({ msg: "Only staff are allowed" });

  try {
    const staff = await Staff.findOne({ user: user._id });
    if (!staff) return res.status(404).json({ msg: "Staff not found" });
    if (staff.post !== constants.staff.posts.WAITER)
      return res.status(403).json({ msg: "Only waiter can mark delivered" });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    order.delivered = true;
    await order.save();

    return res.status(200).json({ msg: "Marked prepared successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Failed to delete order" });
  }
};
