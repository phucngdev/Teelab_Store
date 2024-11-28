const categoryRoutes = require("express").Router();
const categoryController = require("../controllers/category.controller");
const verifyToken = require("../middlewares/verifyToken");

// tạo mới 1 danh mục
categoryRoutes.post(
  "/create",
  verifyToken.verifyTokenHandleAdmin,
  categoryController.createCategory
);
// lấy tất cả danh mục
categoryRoutes.get("/", categoryController.getAllCategory);
// xoá 1 danh mục theo id
categoryRoutes.delete(
  "/delete/:id",
  verifyToken.verifyTokenHandleAdmin,
  categoryController.deleteCategory
);
// cập nhật thông tin danh mục theo id
categoryRoutes.put(
  "/update/:id",
  verifyToken.verifyTokenHandleAdmin,
  categoryController.updateCategory
);

module.exports = { categoryRoutes };
