const express = require("express");
const router = express.Router();
const staffControllers = require("../controllers/staff-controller");
const authMiddlewares = require("../middlewares/auth.middlewares");

router
  .route("/")
  .get(
    authMiddlewares.verifyToken,
    authMiddlewares.isAdmin,
    staffControllers.getAllStaff
  )
  .post(
    authMiddlewares.verifyToken,
    authMiddlewares.isAdmin,
    staffControllers.addStaff
  );
router
  .route("/:id")
  .get(
    authMiddlewares.verifyToken,
    authMiddlewares.isAdmin,
    staffControllers.getStaff
  )
  .delete(
    authMiddlewares.verifyToken,
    authMiddlewares.isAdmin,
    staffControllers.deleteStaff
  )
  .patch(
    authMiddlewares.verifyToken,
    authMiddlewares.isAdmin,
    staffControllers.updateStaff
  );

module.exports = router;
