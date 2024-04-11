const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking-controller");
const { verifyToken } = require("../middlewares/auth.middlewares");

router.route("/").post(verifyToken, bookingController.bookTable);

module.exports = router;
