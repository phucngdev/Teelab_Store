const pool = require("../../../config/database");
const { v4: uuidv4 } = require("uuid");

module.exports.getAllUserService = async (admin_id) => {
  try {
    const [result] = await pool.execute(
      "SELECT * FROM users WHERE user_id != ?",
      [admin_id]
    );
    return result;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.getMessageUserService = async (
  room_id,
  created_at_last_message
) => {
  console.log("🚀 ~ room_id:", room_id, created_at_last_message);
  try {
    const promise = [
      pool.execute("SELECT * FROM users WHERE room_id = ?", [room_id]),
    ];
    let isScroll = false;
    if (created_at_last_message != 0) {
      const date = new Date(created_at_last_message);
      // Thêm 7 giờ vào thời gian UTC để chuyển sang GMT+7
      date.setHours(date.getHours() + 7);
      // Chuyển đổi đối tượng Date sang chuỗi định dạng 'YYYY-MM-DD HH:MM:SS'
      const format_created_at = date
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      promise.push(
        pool.execute(
          "SELECT * FROM messages WHERE room_id = ? AND created_at < ? ORDER BY created_at DESC LIMIT 20",
          [room_id, format_created_at]
        )
      );
      isScroll = true;
    } else {
      promise.push(
        pool.execute(
          "SELECT * FROM messages WHERE room_id = ? ORDER BY created_at DESC LIMIT 20",
          [room_id]
        )
      );
    }

    const [[[user]], [message]] = await Promise.all(promise);

    const message_reverse = message.reverse();

    return {
      status: 200,
      user: user,
      message: message_reverse,
      isScroll: isScroll,
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports.sendMessageService = async (room_id, body) => {
  try {
    await pool.execute(
      "INSERT INTO messages (message_id, room_id, sender_id, content) VALUES (?, ?, ?, ?)",
      [uuidv4(), room_id, body.sender_id, body.content]
    );
    return { status: 201, message: "Message sent successfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
