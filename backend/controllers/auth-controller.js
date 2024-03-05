const User = require("../models/user-model");

const register = async (req, res) => {
  try {
    const { fullname, username, email, phone, password } = req.body;

    // check if email is already used
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "Email already exists" });

    // hash the password

    const userCreated = await User.create({
      fullname, 
      username,
      email,
      phone,
      password,
    });
    
    await userCreated.save();

    res.status(200).json({
      message: "Registration successful.",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });

  } catch (error) {
    return res.status(500).json({msg: "Registration unsuccessfull"});
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email is already used
    const userExist = await User.findOne({ email });
    if (!userExist) return res.status(400).json({ msg: "Invalid credentials" });

    const user = await userExist.comparePassword(password);
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful.",
      token: await userExist.generateToken(),
      userId: userExist._id.toString(),
    });
  } catch (error) {
    return res.status(500).json({msg: "Registration unsuccessfull"});
  }
};

module.exports = { register, login };
