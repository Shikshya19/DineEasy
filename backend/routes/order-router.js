const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middlewares/auth.middlewares");
const orderController = require("../controllers/order-controller");

router
  .route("/")
  .post(verifyToken, orderController.addOrder)
  .get(verifyToken, orderController.getOrders);

router.route("/my-orders").get(verifyToken, orderController.getMyOrders);

router.route("/:id").delete(verifyToken, orderController.removeItem);

router
  .route("/mark-prepared/:orderId")
  .patch(verifyToken, orderController.markPrepared);

router
  .route("/mark-delivered/:orderId")
  .patch(verifyToken, orderController.markDelivered);

module.exports = router;
