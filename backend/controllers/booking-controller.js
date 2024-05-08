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
    .status(200)
    .json({ message: "Table booked successfully", newBooking });
};

exports.unbookTable = async (req, res) => {
  const { id } = req.params;
  const unbooked = await TableBooking.deleteMany({ table: id });
  if (!unbooked) return res.status(404).json({ message: "Table not found" });

  return res.status(200).json({ message: "Unbooked successfully", unbooked });
};
