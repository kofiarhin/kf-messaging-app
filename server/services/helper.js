const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const createUser = async (userData) => {
  try {
    const { name, email, password } = userData;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
};
