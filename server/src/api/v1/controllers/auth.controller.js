const authService = require("../services/auth.service");

// đăng ký
module.exports.register = async (req, res) => {
  try {
    // gọi đến service gửi theo body
    const result = await authService.registerService(req.body);
    // trả về status và kết quả
    return res.status(201).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};

// đăng nhập
module.exports.login = async (req, res) => {
  try {
    const result = await authService.loginService(req.body);
    if (result.status === 200) {
      res
        .cookie("accessToken", result.accessToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
          secure: true,
          sameSite: "none",
        })
        .cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          secure: true,
          sameSite: "none",
        });
    }
    // trả về status và kết quả
    return res.status(result.status).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};

// kiểm tra khi vào trang admin
module.exports.checkRoleAdmin = async (req, res) => {
  try {
    // gọi đến service kiểm tra quyền admin
    const result = await authService.checkRoleAdminService();
    // trả về status và kết quả
    return res.status(200).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};

// đăng xuất
module.exports.logout = async (req, res) => {
  try {
    const result = await authService.logoutService(req.cookies.refreshToken);
    if (result.status === 200) {
      res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none",
      });
      res.clearCookie("refreshToken", {
        secure: true,
        sameSite: "none",
      });
    }
    return res
      .status(200)
      .json({ status: 200, message: "Logged out successfully" });
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};

// lấy accesstoken mới khi hết hạn
module.exports.refreshToken = async (req, res) => {
  try {
    // gọi đến service gửi theo refreshToken
    const result = await authService.refreshTokenService(
      req.cookies.refreshToken
    );
    // nếu status = 200 thì lưu token và info vào cookie client
    if (result.status === 200) {
      res.cookie("accessToken", result.accessToken, {
        httpOnly: true, // client ko lây ra đc
        expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
        secure: true, // true nêu https
        sameSite: "none",
      });
    }
    // trả về status và kết quả
    return res.status(result.status).json(result);
  } catch (error) {
    // trả về status và kết quả
    return res.status(500).json({ message: error.message });
  }
};
