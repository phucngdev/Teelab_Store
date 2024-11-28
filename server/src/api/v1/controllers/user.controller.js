const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");

module.exports.getInfoUser = async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.cookies.accessToken,
      process.env.JWT_ACCESS_KEY
    );
    const result = await userService.getUserInfoService(decoded.user_id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// lấy tất cả user
module.exports.getAllUser = async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.cookies.accessToken,
      process.env.JWT_ACCESS_KEY
    );
    const result = await userService.getAllUserService(decoded.user_id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update trạng thái của user (hoạt động | bị chặn)
module.exports.updateStatusUser = async (req, res) => {
  try {
    // gọi đến service gửi theo user id và trạng thái mới
    const result = await userService.updateStatusUserService(
      req.params.id,
      req.params.status
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
