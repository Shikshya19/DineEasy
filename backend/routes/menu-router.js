const express = require("express");
const router = express.Router();
const menuControllers = require("../controllers/menu-controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middlewares");

router
  .route("/")
  .post(verifyToken, isAdmin, menuControllers.addMenu)
  .get(menuControllers.getMenu);

module.exports = router;
