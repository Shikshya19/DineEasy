const Menu = require("../models/menu-model");

exports.addMenu = async (req, res) => {
  const { itemName, price, description } = req.body;
  if (!itemName || !price || !description)
    return res.status(400).json({ message: "All fields are required" });

  const alreadyAdded = await Menu.findOne({ itemName, price });
  if (alreadyAdded)
    return res.status(400).json({ message: "Menu is already added" });

  const newMenu = await Menu.create({ itemName, price, description });
  return res.status(201).json({ message: "Menu added successfully", newMenu });
};

exports.getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
