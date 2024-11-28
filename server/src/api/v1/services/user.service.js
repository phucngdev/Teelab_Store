const pool = require("../../../config/database");

module.exports.getUserInfoService = async (user_id) => {
  try {
    const [[user]] = await pool.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [user_id]
    );
    if (!user) {
      return { status: 404, message: "User not found" };
    }
    return user;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

// lấy tất cả user
module.exports.getAllUserService = async (admin_id) => {
  try {
    // lấy tất cả user trừ admin
    const [users] = await pool.execute(
      "SELECT * FROM users WHERE user_id != ?",
      [admin_id]
    );
    return users;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

// update trạng thái tk
module.exports.updateStatusUserService = async (user_id, status) => {
  try {
    await pool.execute("UPDATE users SET status = ? WHERE user_id = ?", [
      status,
      user_id,
    ]);
    return { status: 200, message: "User status updated successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
