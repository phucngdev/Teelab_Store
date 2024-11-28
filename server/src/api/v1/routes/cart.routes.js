const cartRoutes = require("express").Router();
const cartController = require("../controllers/cart.controller");
const verifyToken = require("../middlewares/verifyToken");

// thêm sản phẩm vào giỏ hàng
cartRoutes.post("/add/:id", verifyToken.verifyToken, cartController.addToCart);
// lấy giỏ hàng của 1 user
cartRoutes.get(
  "/get_cart",
  verifyToken.verifyToken,
  cartController.getCartById
);
// cập nhật giỏ hàng của 1 user |||||||| chưa sửa
cartRoutes.put("/update", verifyToken.verifyToken, cartController.updateCart);
// xoá 1 sp trong giỏ hàng của 1 user
cartRoutes.delete(
  "/:id",
  verifyToken.verifyToken,
  cartController.deleteCartItem
);

module.exports = { cartRoutes };
