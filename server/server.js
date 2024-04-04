const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const { auth } = require("./middlewares/authMiddleware");

// connect to database
connectDB();

// setup middleware
app.use(express.json());
app.use(cookieParser());

// set up routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/checkuser", auth);

// error handler
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
