const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("./staff-model");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "Customer",
    enum: ["Admin", "Staff", "Customer"],
  },
  verified: { type: Boolean, default: false },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt();
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

// json web token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
