const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/helper");
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      res.status(400);
      throw new Error("user not created");
    }

    const { password: userPassword, ...rest } = user._doc;

    return res.status(201).json({ ...rest });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("user not found");
    }

    // compare password
    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      res.status(400);
      throw new Error("invalid credentials");
    }

    // login user
    const token = generateToken(user._id);
    res.cookie("jwt", token);

    const { password: removedPassword, ...rest } = user._doc;
    return res.json(rest);
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    return res.json({ message: "you have been logged out" });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    return res.json(req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
};
