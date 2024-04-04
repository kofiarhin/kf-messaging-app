const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    let token;
    token = req.cookies.jwt;
    if (!token) {
      res.status(400);
      throw new Error("no token");
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (!id) {
      res.ststus(401);
      throw new Error("unauthorized: invalid token");
    }

    // get user
    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("unauthorized: user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  auth,
};
