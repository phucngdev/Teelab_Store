const axios = require("axios");
const pool = require("../../../config/database");

// kiểm tra email hợp lệ
module.exports.verifyEmailWithGoogle = async (req, res, next) => {
  try {
    // lấy email từ request body
    const { email } = req.body;

    // gọi API Hunter.io để kiểm tra email
    const response = await axios.get(
      `https://api.hunter.io/v2/email-verifier`,
      {
        params: {
          email: email,
          api_key: process.env.API_KEY_HUNTER,
        },
      }
    );

    // kiểm tra kết quả trả về
    const { result, score } = response.data.data;

    // kiểm tra email hợp lệ
    if (result !== "deliverable" || score < 80) {
      // không hợp lệ trả về 404 email ko tồn tại
      return res.status(404).json({
        status: 404,
        message: "Invalid or non-existent email address",
      });
    }
    // cho đi tiếp
    next();
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};

// kiểm tra email đã tồn tại
module.exports.checkEmailExists = async (req, res, next) => {
  try {
    // lấy email từ request body
    const { email } = req.body;
    // kiểm tra email tồn tại trong db
    const [[user]] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (user) {
      // email đã tồn tại trả về 400 email đã tồn tại
      return res
        .status(400)
        .json({ status: 400, message: "Email already exists" });
    }
    // cho đi tiếp
    next();
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};
