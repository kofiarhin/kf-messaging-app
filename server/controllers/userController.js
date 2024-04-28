const User = require("../models/userModel");
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("name email");

    if(!user) {
      res.status(400);
      throw new Error({message: "user not found"})
    }

    return res.json(user)
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
