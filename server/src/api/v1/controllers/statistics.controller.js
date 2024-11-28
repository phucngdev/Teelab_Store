const statisticService = require("../services/statistics.service");

// trả về thông tin trên trang dashboard
module.exports.dashboard = async (req, res) => {
  try {
    // gọi đến service lấy thông tin trên trang dashboard
    const result = await statisticService.dashboardService();
    // trả về status và kết quả
    return res.status(result.status).json(result.data);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};
