const TableBooking = require("../models/table-booking");

exports.bookTable = async (req, res) => {
  const user = req.user;
  const { tableId, event } = req.body;
  if (!tableId)
    return res.status(400).json({ message: "All fields are required" });

  const alreadyBooked = await TableBooking.findOne({ table: tableId });
  if (alreadyBooked)
    return res.status(400).json({ message: "Table is already booked" });

  const newBooking = await TableBooking.create({
    customer: user._id,
    table: tableId,
    event,
  });
  return res
    .status(201)
    .json({ message: "Table booked successfully", newBooking });
};
