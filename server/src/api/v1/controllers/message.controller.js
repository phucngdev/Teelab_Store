const messageService = require("../services/message.service");
const jwt = require("jsonwebtoken");

// lấy tất cả user
module.exports.getAllUser = async (req, res) => {
  try {
    // giải mã token để lấy id admin
    const { user_id } = jwt.verify(
      req.cookies.accessToken,
      process.env.JWT_ACCESS_KEY
    );
    // gọi đến service lấy tất cả user gửi theo id admin
    const result = await messageService.getAllUserService(user_id);
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};

// lấy message của 1 user
module.exports.getMessageUser = async (req, res) => {
  try {
    // gọi đến service gửi theo id phòng và thời gian tin nhắn bắt đầu lấy (20 tin nhắn gần nhất)
    const result = await messageService.getMessageUserService(
      req.params.room_id,
      req.params.created_at
    );
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: "Server error" });
  }
};

// gửi tin nhắn (lưu tin nhắn)
module.exports.sendMessage = async (req, res) => {
  try {
    // gọi đến service và gửi theo user id và body
    const result = await messageService.sendMessageService(
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
