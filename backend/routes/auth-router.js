const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const { verifyToken } = require("../middlewares/auth.middlewares");

router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);
router
  .route("/user")
  .get(verifyToken, authControllers.getUser)
  .patch(verifyToken, authControllers.updateUserInfo);
router
  .route("/change-password")
  .patch(verifyToken, authControllers.updateUserPassword);
router.route("/verify-otp").post(authControllers.verifyOtp);

module.exports = router;
