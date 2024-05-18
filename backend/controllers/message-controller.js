const Message = require("../models/message-model");
exports.createMessage = async (req, res) => {
  try {
    const { email, message } = req.body;
    if (!email || !message)
      return res.status(400).json({ msg: "Email and message is required" });
    const alreadyExist = await Message.findOne({ email, message });
    if (alreadyExist)
      return res.status(400).json({ msg: "Message already created" });

    const newMessage = await Message.create({ email, message });

    res.status(201).json({
      message: "Message added successfully",
      newMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed creating message" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    return res.status(201).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error getting messages" });
  }
};
