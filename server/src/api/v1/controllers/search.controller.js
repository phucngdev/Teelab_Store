const searchService = require("../services/search.service");

// tìm kiếm toàn cục (admin) [đơn hàng | user | sản phẩm | ...]
module.exports.searchGlobal = async (req, res) => {
  try {
    // gọi đến service tìm kiếm toàn cục theo từ khóa tìm kiếm
    const result = await searchService.searchGlobalService(req.query.query);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};
