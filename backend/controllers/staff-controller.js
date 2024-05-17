const Staff = require("../models/staff-model.js");
const User = require("../models/user-model.js");

exports.getAllStaff = async (req, res) => {
  try {
    const staffs = await Staff.find().populate("user", "-password");
    res.status(200).json(staffs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch staff" });
  }
};
exports.addStaff = async (req, res) => {
  try {
    const { fullname, username, email, phone, password } = req.body;
    if ([fullname, username, email, phone, password].some((field) => !field)) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // check if email is already used
    const emailUsed = await User.findOne({ email });
    if (emailUsed) return res.status(400).json({ msg: "Email already exists" });

    // check if username is already used
    const usernameUsed = await User.findOne({ username });
    if (usernameUsed)
      return res.status(400).json({ msg: "Username already taken" });

    const userCreated = await User.create({
      fullname,
      username,
      email,
      phone,
      password,
      role: "Staff",
      verified: true,
    });
    const newUser = await User.findById(userCreated._id, "-password");
    if (!newUser) return res.status(500).json({ msg: "Failed to create user" });

    const staffCreated = await Staff.create({
      user: newUser._id,
      post: req.body.post,
    });

    const newStaff = await Staff.findById(staffCreated._id).populate(
      "user",
      "-password"
    );

    res.status(201).json({
      message: "Staff added successfully",
      newStaff,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Registration failed" });
  }
};
exports.deleteStaff = async (req, res) => {
  console.log(req.params);
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    await User.deleteOne({ _id: staff.user });
    await Staff.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Staff removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove staff" });
  }
};
exports.updateStaff = async (req, res) => {
  console.log(req.params.id);
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    const { fullname, username, email, phone, post } = req.body;

    const emailUsed = await User.findOne({ email });
    if (emailUsed && emailUsed._id.toString() !== staff.user.toString())
      return res.status(400).json({ msg: "Email already exists" });

    const usernameUsed = await User.findOne({ username });
    if (usernameUsed && usernameUsed._id.toString() !== staff.user.toString())
      return res.status(400).json({ msg: "Username already taken" });

    const userUpdated = await User.findByIdAndUpdate(
      staff.user,
      {
        fullname,
        username,
        email,
        phone,
      },
      { new: true }
    );
    if (!userUpdated)
      return res.status(500).json({ msg: "Failed to update user" });

    const staffUpdated = await Staff.findByIdAndUpdate(
      req.params.id,
      {
        post,
      },
      { new: true }
    ).populate("user", "-password");

    res.status(200).json({
      message: "Staff updated successfully",
      staff: staffUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update staff" });
  }
};
