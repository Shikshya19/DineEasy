const express = require("express");
const router = express.Router();
const tableControllers = require("../controllers/table-controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middlewares");

router
  .route("/")
  .post(verifyToken, isAdmin, tableControllers.addTable)
  .get(tableControllers.getTables);

module.exports = router;
