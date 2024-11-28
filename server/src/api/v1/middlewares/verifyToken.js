const jwt = require("jsonwebtoken");
const pool = require("../../../config/database");
const authService = require("../services/auth.service");

// kiểm tra token admin
module.exports.verifyTokenHandleAdmin = async (req, res, next) => {
  try {
    // lấy token
    const token = req.cookies.accessToken;
    if (!token) {
      // không có token trả về status 400
      return res.status(401).json({ message: "Token is required" });
    }
    // giải mã token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    if (!decoded) {
      // giải mã sai trả về token từ chối truy cập
      return res.status(500).json({ message: "Access denied" });
    }
    // lấy time hiện tại
    const currentTime = Math.floor(Date.now() / 1000);
    // lấy time hết hạn token
    const expiresIn = decoded.exp;
    // so sánh
    const isExpired = currentTime > expiresIn;
    if (isExpired) {
      // isExpired = true hết hạn token trả về 401
      return res.status(401).json({ status: 401, message: "Token expired" });
    }
    // kiểm tra user
    const [[user]] = await pool.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [decoded.user_id]
    );
    if (!user) {
      // không tồn tại user trả về 404
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    // kiểm tra role admin
    if (user.role !== "admin") {
      // khác admin trả về 403 từ chối truy cập
      return res.status(403).json({ status: 403, message: "Access denied" });
    }
    // cho đi tiếp
    next();
  } catch (error) {
    // trả về status và kq
    return res.status(500).json({ message: error.message });
  }
};

// kiểm tra token
module.exports.verifyToken = async (req, res, next) => {
  try {
    // lấy token
    const token = req.cookies.accessToken;
    if (!token) {
      // không có token trả về status 400
      return res
        .status(401)
        .json({ status: 401, message: "Token is required" });
    }
    // giải mã token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    if (!decoded) {
      // giải mã sai trả về token từ chối truy cập
      return res.status(500).json({ status: 500, message: "Access denied" });
    }
    // lấy time hiện tại
    const currentTime = Math.floor(Date.now() / 1000);
    // lấy time hết hạn token
    const expiresIn = decoded.exp;
    // so sánh
    const isExpired = currentTime > expiresIn;
    if (isExpired) {
      // isExpired = true hết hạn token trả về 401
      return res.status(401).json({ status: 401, message: "Token expired" });
    }
    // kiểm tra user
    const [[user]] = await pool.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [decoded.user_id]
    );
    if (!user) {
      // không tồn tại user trả về 404
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    if (user.status === 0) {
      // user đã bị khoá trả về 403
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.clearCookie("user_info");
      return res
        .status(403)
        .json({ status: 403, message: "User is not active" });
    }
    // cho đi tiếp
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.verifyTokenPublic = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    const rft = req.cookies.refreshToken;
    if (!token && rft) {
      const result = await authService.refreshTokenService(rft);
      if (result.status === 200) {
        res
          .cookie("accessToken", result.accessToken, {
            httpOnly: true, // client ko lây ra đc
            expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
            secure: true, // true nêu https
            sameSite: "none",
          })
          .cookie("user_info", JSON.stringify(result.user_info), {
            httpOnly: false,
            expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
            secure: true,
            sameSite: "none",
          });
      }
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
