const orderRoutes = require("express").Router();
const orderController = require("../controllers/order.controller");
const verifyToken = require("../middlewares/verifyToken");

// tạo mới 1 order
orderRoutes.post("/create", orderController.createOrder);
// lấy tất cả order của 1 user
orderRoutes.get("/user/:id", orderController.getAllOrderByUser);
// lấy tất cả order
orderRoutes.get(
  "/admin/",
  // verifyToken.verifyTokenHandleAdmin,
  orderController.getAllOrder
);
// lấy 1 order phía admin
orderRoutes.get(
  "/admin/:id",
  // verifyToken.verifyTokenHandleAdmin,
  orderController.getOneOrder
);
// check status của order khi dùng zalopay
orderRoutes.get(
  "/zalopay/check-status/:id",
  orderController.zalopayCheckStatus
);

// tạo mới 1 đơn hàng với tt zalopay
orderRoutes.post("/create/zalopay", orderController.createOrderWithZalopay);
// callback của zalopay
orderRoutes.post("/zalopay/callback", orderController.zalopayCallBack);
// update status order
orderRoutes.put(
  "/admin/status/:id",
  verifyToken.verifyTokenHandleAdmin,
  orderController.updateStatusOrder
);

module.exports = { orderRoutes };
