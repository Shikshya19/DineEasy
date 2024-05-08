const constants = require("../constants");
const User = require("../models/user-model");
const Staff = require("../models/staff-model");

const register = async (req, res) => {
  try {
    const { fullname, username, email, phone, password } = req.body;
    console.log(fullname, username, email, phone, password);
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
    });
    const newUser = await User.findById(userCreated._id, "-password");
    res.status(200).json({
      message: "Registration successful.",
      token: await userCreated.generateToken(),
      newUser,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Registration failed" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].some((field) => !field)) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) return res.status(400).json({ msg: "Invalid credentials" });

    const passwordCorrect = await userExist.comparePassword(password);
    if (!passwordCorrect)
      return res.status(400).json({ msg: "Invalid credentials" });

    const user = await User.findById(userExist._id, "-password");

    res.status(200).json({
      message: "Login successful.",
      token: await userExist.generateToken(),
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Login failed" });
  }
};
const getUser = async (req, res) => {
  const user = req.user.toObject();
  try {
    if (user.role === constants.user.roles.STAFF) {
      const staff = await Staff.findOne({ user: user._id });
      user.staffPost = staff.post;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login, getUser };
