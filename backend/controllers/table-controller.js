const Table = require("../models/table-model");

exports.addTable = async (req, res) => {
  const { name, seatCapacity } = req.body;
  if (!name || !seatCapacity)
    return res.status(400).json({ message: "All fields are required" });

  const alreadAdded = await Table.findOne({ name });
  if (alreadAdded)
    return res.status(400).json({ message: "Table is already added" });

  const newTable = await Table.create({ name, seatCapacity });
  return res
    .status(201)
    .json({ message: "Table added successfully", newTable });
};

exports.getTables = async (req, res) => {
  const tables = await Table.aggregate([
    {
      $lookup: {
        from: "tablebookings",
        localField: "_id",
        foreignField: "table",
        as: "bookings",
      },
    },
    {
      $addFields: {
        booked: {
          $cond: {
            if: { $gt: [{ $size: "$bookings" }, 0] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: { bookings: 0 },
    },
  ]);
  res.status(200).json(tables);
};

exports.deleteTable = async (req, res) => {
  const { id } = req.params;
  const deletedTable = await Table.findByIdAndDelete(id);
  if (!deletedTable)
    return res.status(404).json({ message: "Table not found" });

  return res
    .status(200)
    .json({ message: "Table deleted successfully", deletedTable });
};
