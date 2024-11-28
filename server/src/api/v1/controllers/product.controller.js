const productService = require("../services/product.service");

// lấy tất cả sản phẩm
module.exports.getAll = async (req, res) => {
  try {
    // lấy số trang và số sản phẩm trên trang
    const { page, limit } = req.query;
    // gọi đến service lấy tất cả sản phẩm theo page và limit
    const result = await productService.getAllService(page, limit);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};

// lấy thông tin 1 sản phẩm
module.exports.getOne = async (req, res) => {
  try {
    // gọi đến service lấy thông tin 1 sản phẩm theo id sản phẩm
    const result = await productService.getOneService(req.params.id);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};

// lấy thông tin sản phẩm để update
module.exports.getOneForUpdate = async (req, res) => {
  try {
    // gọi đến service lấy thông tin 1 sản phẩm theo id sản phẩm
    const result = await productService.getOneForUpdateService(req.params.id);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};

// xoá sản phẩm
module.exports.deleteOne = async (req, res) => {
  try {
    // lấy id sản phẩm trong params
    const { id } = req.params;
    // gọi đến service xoá sản phẩm theo id sản phẩm
    await productService.deleteOneService(id);
    // trả về status và kết quả
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};

// xoá tất cả sản phẩm trong bảng
module.exports.deleteAll = async (req, res) => {
  try {
    // gọi đến service xoá tất cả sản phẩm trong bảng
    await productService.deleteAllService();
    // trả về status và kết quả
    return res
      .status(200)
      .json({ message: "All products deleted successfully" });
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};

// tạo mới 1 sản phẩm
module.exports.createProduct = async (req, res) => {
  try {
    // gọi đến service tạo mới sản phẩm gửi theo body
    const result = await productService.createProductService(req.body);
    // trả về status và kết quả
    return res.status(201).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};

// không sử dụng hàm này
module.exports.updateProduct = async (req, res) => {
  try {
    const result = await productService.updateProductService(
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

// tìm kiếm sản phẩm
module.exports.searchProduct = async (req, res) => {
  try {
    // gọi đến service tìm kiếm sản phẩm theo từ khóa tìm kiếm
    const result = await productService.searchProductService(req.query.q);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};

// update trạng thái bán của sản phẩm (bán | ngừng bán)
module.exports.updateStatusProduct = async (req, res) => {
  try {
    // lấy id sản phẩm trong params và trạng thái mới trong body
    const result = await productService.updateStatusProductService(
      req.params.id,
      req.body.status
    );
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};

// lấy thông tin 1 sản phẩm để nhập hàng
module.exports.getOneProductImport = async (req, res) => {
  try {
    // gọi đến service lấy theo id sản phẩm trong params
    const result = await productService.getOneProductImportService(
      req.params.id
    );
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};

// nhập hàng || chỉnh sửa số lượng
module.exports.importQuantityProduct = async (req, res) => {
  try {
    // gọi đến service gửi theo id sản phẩm trong params và thông tin mới trong body
    const result = await productService.importQuantityProductService(
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

// thêm mới size
module.exports.addNewSize = async (req, res) => {
  try {
    // gọi đến service gửi theo id sản phẩm trong params và thông tin size mới trong body
    const result = await productService.addNewSizeService(
      req.params.id,
      req.body
    );
    // trả về status và kết quả
    return res.status(201).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};

// xoá size
module.exports.deleteSize = async (req, res) => {
  try {
    // gọi đến service gửi theo size id
    const result = await productService.deleteSizeService(req.params.id);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};
