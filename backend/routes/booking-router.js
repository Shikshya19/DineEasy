const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking-controller");
const {
  verifyToken,
  isAdmin,
  onlyCustomer,
} = require("../middlewares/auth.middlewares");

router.route("/").post(verifyToken, onlyCustomer, bookingController.bookTable);
router
  .route("/:id")
  .delete(verifyToken, isAdmin, bookingController.unbookTable);

module.exports = router;
