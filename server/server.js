const app = require("./app");
const dotenv = require("dotenv").config();
const http = require("http");
const connectDB = require("./config/db");
const { Server } = require("socket.io");

// create server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
// connect to database
connectDB(process.env.MONGO_URI);

// connect socket io

io.on("connection", (socket) => {
  socket.on("join", (conversationId) => {
    socket.join(conversationId);
  });
  socket.on("new_message", ({ id, message }) => {
    io.to(id).emit("message", message);
  });
  socket.on("disconnect", () => {
    console.log("socket connection disconnected");
  });
  ``;
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Listening on port ${port}`));
