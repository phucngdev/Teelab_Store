const userRoutes = require("express").Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");

userRoutes.get("/info", userController.getInfoUser);

// lấy tất cả user
userRoutes.get(
  "/",
  verifyToken.verifyTokenHandleAdmin,
  userController.getAllUser
);

// update status user khoá || mở tài khoản
userRoutes.put(
  "/:id/status/:status",
  verifyToken.verifyTokenHandleAdmin,
  userController.updateStatusUser
);

module.exports = { userRoutes };
