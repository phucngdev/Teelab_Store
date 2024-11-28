const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const socketService = require("./api/v1/services/socket.service");

require("dotenv").config();
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
global._io = socketIo;

global._io.on("connection", socketService.socketConnect());

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server run http://localhost:${PORT}`);
});
