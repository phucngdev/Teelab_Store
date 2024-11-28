module.exports.socketConnect = () => {
  return (socket) => {
    // Lắng nghe sự kiện "joinRoom" từ client để tham gia room cụ thể
    socket.on("joinRoom", ({ room_id }) => {
      socket.join(room_id);
    });

    // Nhận thông báo người dùng đang gõ
    socket.on("userTyping", (data) => {
      const { room_id } = data;
      _io.to(room_id).emit("userTyping", data); // Phát lại thông báo cho tất cả các client trong room
    });

    // Lắng nghe sự kiện "sendMessage" từ client
    socket.on("sendMessage", (data) => {
      const { room_id } = data;
      // Gửi tin nhắn đến tất cả các client trong room
      _io.to(room_id).emit("sendMessage", data);
    });

    // gửi thông báo
    socket.on("newNotification", (data) => {
      // Sau đó gửi tin nhắn đến tất cả các người dùng kết nối
      _io.emit("notification", { data });
    });

    // Lắng nghe sự kiện "leaveRoom" từ client để thoát room cụ thể

    // disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  };
};
