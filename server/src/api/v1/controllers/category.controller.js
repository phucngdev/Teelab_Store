const categoryService = require("../services/category.service");

// tạo mới danh mục
module.exports.createCategory = async (req, res) => {
  try {
    // gọi đến service tạo mới danh mục gửi theo body
    const result = await categoryService.createCategoryService(req.body);
    // trả về status và kết quả
    return res.status(201).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};

// lấy tất cả danh mục
module.exports.getAllCategory = async (req, res) => {
  try {
    // gọi đến service lấy tất cả danh mục
    const result = await categoryService.getAllCategoryService();
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};

// xoá danh mục
module.exports.deleteCategory = async (req, res) => {
  try {
    // gọi đến service xoá danh mục gửi theo id danh mục
    const result = await categoryService.deleteCategoryService(req.params.id);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};

// sửa danh mục
module.exports.updateCategory = async (req, res) => {
  try {
    // gọi đến service sửa danh mục gửi theo id danh mục và body
    const result = await categoryService.updateCategoryService(
      req.params.id,
      req.body
    );
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};
