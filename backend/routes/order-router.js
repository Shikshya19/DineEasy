const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middlewares");
const orderController = require("../controllers/order-controller");

router.route("/").post(verifyToken, orderController.addOrder);
router.route("/:id").delete(verifyToken, orderController.removeItem);
router.route("/my-orders").get(verifyToken, orderController.getMyOrder);

module.exports = router;
