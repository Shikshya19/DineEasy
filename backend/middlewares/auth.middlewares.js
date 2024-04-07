const User = require("../models/user-model");
const constants = require("../constants");
const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Unauthorized request" });

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decodedToken?.userId).select("-password");
  if (!user) return res.status(401).json({ message: "Invalid access token" });

  req.user = user;
  next();
};

exports.isAdmin = async (req, res, next) => {
  if (req.user.role != constants.user.roles.ADMIN) {
    return res.status(403).json({ message: "Unauthorized request" });
  }
  next();
};
