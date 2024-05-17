const constants = require("../constants");
const User = require("../models/user-model");
const Staff = require("../models/staff-model");
const Otp = require("../models/otp-model");
const { sendEmail } = require("../utils/nodemailer");

const register = async (req, res) => {
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

    // Send OTP to the user's email
    const otp = Math.floor(100000 + Math.random() * 900000);
    await Otp.create({ email, otp });
    await sendEmail({
      email,
      subject: "Verify your email - DineEasy",
      html: `
         <p>Dear User,</p>
         <p>Your OTP for email verification is: <strong>${otp}</strong></p>
         <p>Please use this OTP to verify your email.</p>
         <a href="${process.env.WEBSITE_URL}/verify-otp/${email}">Click here to <strong>Verify</strong></a>
         <p>Thank you.</p>
       `,
    });

    // Create a new user
    const userCreated = await User.create({
      fullname,
      username,
      email,
      phone,
      password,
    });
    const newUser = await User.findById(userCreated._id, "-password");
    res.status(200).json({
      message: "OTP has been sent to your email.",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Registration failed" });
  }
};
const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const otpExist = await Otp.findOne({ email });

    if (!otpExist) {
      const userExist = await User.findOne({ email, verified: false });
      if (!userExist) return res.status(400).json({ msg: "Invalid OTP" });

      // Send OTP to the user's email
      const otp = Math.floor(100000 + Math.random() * 900000);
      await Otp.create({ email, otp });
      await sendEmail({
        email,
        subject: "Verify your email - DineEasy",
        html: `
         <p>Dear User,</p>
         <p>Your OTP for email verification is: <strong>${otp}</strong></p>
         <p>Please use this OTP to verify your email.</p>
         <a href="${process.env.WEBSITE_URL}/verify-otp/${email}">Click here to <strong>Verify</strong></a>
         <p>Thank you.</p>
       `,
      });

      res.status(200).json({
        message: "OTP was expired. New OTP has been sent to your email.",
      });
    }

    if (otpExist.otp != otp)
      return res.status(400).json({ msg: "Invalid OTP" });

    const user = await User.findOneAndUpdate(
      { email },
      {
        verified: true,
      }
    );

    await Otp.deleteMany({ email });

    const token = await user.generateToken();

    res.status(200).json({
      message: "Email verified successfully!",
      token,
      userId: user._id.toString(),
    });
  } catch (error) {
    next(error);
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

    if (!userExist.verified)
      return res.status(403).json({ msg: "Verify your email to login" });

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
const updateUserInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const { email, username, fullname, phone } = req.body;

    // Check if required fields are present
    if (![email, username, fullname, phone].every(Boolean)) {
      return res.status(400).json({ msg: "All profile fields are required" });
    }

    // Check if the email is taken by another user
    const emailTaken = await User.findOne({ email, _id: { $ne: userId } });
    if (emailTaken) {
      return res
        .status(400)
        .json({ msg: "Email is already taken by another user" });
    }

    // Check if the username is taken by another user
    const usernameTaken = await User.findOne({
      username,
      _id: { $ne: userId },
    });
    if (usernameTaken) {
      return res
        .status(400)
        .json({ msg: "Username is already taken by another user" });
    }

    // Update the user
    await User.findByIdAndUpdate(userId, {
      email,
      username,
      fullname,
      phone,
    });

    // Exclude password field in the response
    const updatedUser = await User.findById(userId, "-password");

    res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Update failed" });
  }
};
const updateUserPassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;

    // Check if required fields are present
    if (![oldPassword, newPassword].every(Boolean)) {
      return res
        .status(400)
        .json({ msg: "Old password and new password are required" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Verify the old password
    const passwordCorrect = await user.comparePassword(oldPassword);
    if (!passwordCorrect) {
      return res.status(400).json({ msg: "Old password is incorrect" });
    }

    // Update to the new password
    user.password = newPassword;

    // Save the updated password
    await user.save();

    res.status(200).json({
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Update failed" });
  }
};

module.exports = {
  register,
  verifyOtp,
  login,
  getUser,
  updateUserInfo,
  updateUserPassword,
};
