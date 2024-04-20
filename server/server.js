const express = require("express");
const app = express();
const http = require("http");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const { auth } = require("./middlewares/authMiddleware");
const { Server } = require("socket.io");
const cors = require("cors");

// setup middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// create server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
// connect to database
connectDB();

// connect socket io

io.on("connection", (socket) => {
  console.log("connected to socket");
});

// set up routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/checkuser", auth);
app.use("/api/contacts", contactRoutes);

// error handler
app.use(errorHandler);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Listening on port ${port}`));
