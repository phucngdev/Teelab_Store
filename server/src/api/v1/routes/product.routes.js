const productRoutes = require("express").Router();
const productController = require("../controllers/product.controller");
const verifyToken = require("../middlewares/verifyToken");

// lấy tất cả product
productRoutes.get("/", verifyToken.verifyTokenPublic, productController.getAll);
// lấy 1 product phía user
productRoutes.get(
  "/detail/:id",
  verifyToken.verifyTokenPublic,
  productController.getOne
);
// lấy 1 product phía ámin
productRoutes.get(
  "/detail/admin/:id",
  verifyToken.verifyTokenHandleAdmin,
  productController.getOneForUpdate
);
// search
productRoutes.get(
  "/search",
  verifyToken.verifyTokenPublic,
  productController.searchProduct
);
// lấy 1 product để import size
productRoutes.get(
  "/product-import/:id",
  verifyToken.verifyTokenHandleAdmin,
  productController.getOneProductImport
);

// xoá 1 product
productRoutes.delete(
  "/delete/product/:id",
  verifyToken.verifyTokenHandleAdmin,
  productController.deleteOne
);
// xoá cả bảng product
productRoutes.delete(
  "/delete-all",
  verifyToken.verifyTokenHandleAdmin,
  productController.deleteAll
);
// xoá 1 size
productRoutes.delete(
  "/delete/size/:id",
  verifyToken.verifyTokenHandleAdmin,
  productController.deleteSize
);

// tạo 1 product mới
productRoutes.post(
  "/create",
  verifyToken.verifyTokenHandleAdmin,
  productController.createProduct
);
// cập nhật size cho 1 product
productRoutes.post(
  "/product-import/:id",
  verifyToken.verifyTokenHandleAdmin,
  productController.importQuantityProduct
);
// tạo 1 size mới cho 1 product
productRoutes.post(
  "/new-size/:id",
  verifyToken.verifyTokenHandleAdmin,
  productController.addNewSize
);

// chưa làm || bỏ
productRoutes.put(
  "/update/:id",
  verifyToken.verifyTokenHandleAdmin,
  productController.updateProduct
);
// update status bán || ngưng bán
productRoutes.put(
  "/update-status/:id",
  verifyToken.verifyTokenHandleAdmin,
  productController.updateStatusProduct
);

module.exports = { productRoutes };
