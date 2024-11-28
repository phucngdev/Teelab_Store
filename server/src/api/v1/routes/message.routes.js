const messageRoutes = require("express").Router();
const messageController = require("../controllers/message.controller");

// lấy tất cả user
messageRoutes.get("/", messageController.getAllUser);
// lấy tin nhắn của 1 user theo room_id và created_at
messageRoutes.get("/:room_id/:created_at", messageController.getMessageUser);
// gửi tin nhắn mới cho 1 user
messageRoutes.post("/:id", messageController.sendMessage);

module.exports = { messageRoutes };
