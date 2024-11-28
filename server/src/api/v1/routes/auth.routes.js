const authRoutes = require("express").Router();
const authController = require("../controllers/auth.controller");
const authValidate = require("../validations/auth.validate");
const verifyEmail = require("../middlewares/verifyEmail");
const verifyToken = require("../middlewares/verifyToken");

// đăng ký
authRoutes.post(
  "/register",
  authValidate.authValidate,
  verifyEmail.verifyEmailWithGoogle,
  verifyEmail.checkEmailExists,
  authController.register
);
// đăng nhập
authRoutes.post("/login", authValidate.authValidate, authController.login);
// kiểm tra role admin với token
authRoutes.post(
  "/check-role",
  verifyToken.verifyTokenHandleAdmin,
  authController.checkRoleAdmin
);
// đăng xuất
authRoutes.post("/logout", verifyToken.verifyToken, authController.logout);
// refreshToken |||||||| chưa sửa
authRoutes.post("/refresh-token", authController.refreshToken);

module.exports = { authRoutes };
