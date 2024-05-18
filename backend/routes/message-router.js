const messageController = require("../controllers/message-controller");
const express = require("express");
const router = express.Router();

router.post("/", messageController.createMessage);
router.get("/", messageController.getMessages);

module.exports = router;
