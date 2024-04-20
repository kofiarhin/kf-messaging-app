const User = require("../models/userModel");
const getUser = async (req, res, next) => {
  try {
    res.status(400);
    throw new Error("something went wrong");
  } catch (error) {
    next(error);
  }
};

const getUsers = async (Req, res, next) => {
  const users = await User.find().populate({
    path: "contacts",
    select: "-password -converstations -contacts",
  });
  return res.json(users);
};

module.exports = {
  getUser,
  getUsers,
};
