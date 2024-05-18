const Order = require("../models/order-model");
const Menu = require("../models/menu-model");
const constants = require("../constants");
const Staff = require("../models/staff-model");
const axios = require("axios");

exports.addOrder = async (req, res) => {
  try {
    const { orderItems } = req.body;
    console.log(req.body);
    const user = req.user;

    if (user.role !== constants.user.roles.CUSTOMER) {
      return res.status(403).json({ msg: "Only customer can place order" });
    }

    if (orderItems?.length === 0) {
      return res.status(400).json({ msg: "Order items are required" });
    }

    const orderItemsList = await Promise.all(
      orderItems.map(async (orderItem) => {
        const item = await Menu.findById(orderItem.itemId);
        if (!item) return res.status(404).json({ msg: "Item not found" });
        return {
          itemName: item.itemName,
          price: item.price,
          quantity: orderItem.quantity,
        };
      })
    );

    const total = orderItemsList.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);

    const khaltiRes = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        return_url: "http://localhost:5173/my-orders",
        website_url: "http://localhost:5173",
        amount: total * 100,
        purchase_order_id: Date.now() + user._id + total,
        purchase_order_name: "DineEasy Order",
        customer_info: {
          name: user.fullname,
          email: user.email,
          phone: user.phone,
        },
      },
      {
        headers: {
          Authorization: `Key ${process.env.LIVE_SECRET_KEY}`,
        },
      }
    );

    if (khaltiRes.status !== 200) {
      return res.status(500).json({ msg: "Khalti API error" });
    }

    const newOrder = await Order.create({
      user,
      orderItems: orderItemsList,
      total,
      pidx: khaltiRes.data.pidx,
    });

    res.status(201).json({
      message: "Order placed successfully",
      newOrder,
      payment_url: khaltiRes.data.payment_url,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to add order" });
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
          orders = await Order.find({
            prepared: false,
            delivered: false,
          }).populate("user");
          break;
        case constants.staff.posts.WAITER:
          orders = await Order.find({
            prepared: true,
            delivered: false,
          }).populate("user");
          break;
        default:
          orders = await Order.find().populate("user");
      }
    } else {
      orders = await Order.find().populate("user");
    }
    res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ msg: "Failed to get orders" });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const user = req.user;
    const orders = await Order.find({ user });
    await Promise.all(
      orders.map(async (order) => {
        if (!order.paid) {
          await axios
            .post(
              `https://a.khalti.com/api/v2/epayment/lookup/`,
              {
                pidx: order.pidx,
              },
              {
                headers: {
                  Authorization: `Key ${process.env.LIVE_SECRET_KEY}`,
                },
              }
            )
            .then(async (response) => {
              if (response.data.status === "Completed") {
                await Order.findByIdAndUpdate(order._id, { paid: true });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
    );
    const order = await Order.find({ user }).sort({ createdAt: -1 });
    res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ msg: "Failed to get orders" });
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
