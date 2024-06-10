const express = require("express");
const app = express();
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const chatRoutes = require("./routes/chatRotues");
const { auth } = require("./middlewares/authMiddleware");

// setup middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// set up routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/checkuser", auth);
app.use("/api/contacts", contactRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chats", chatRoutes);
// error handler
app.use(errorHandler);

module.exports = app;
