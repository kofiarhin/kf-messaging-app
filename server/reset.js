const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/userModel");
const Conversation = require("./models/converstationModel");
const Message = require("./models/messageModel");
const bcrypt = require("bcryptjs");

connectDB();

const users = [
  {
    name: "kofi arhin",
    email: "kofiarhin@gmail.com",
    password: "password",
  },
  { name: "lebron james", email: "lebron@gmail.com", password: "password" },
  { name: "kyrie Irving", email: "kyrie@gmail.com", password: "password" },
  { name: "kevin durant", email: "kevin@gmail.com", password: "password" },
];

const reset = async () => {
  //    clear users
  await User.deleteMany();
  await Message.deleteMany();
  await Conversation.deleteMany();

  console.log("data base cleared");

  // const newUsers = await Promise.all(
  //   users.map(async (user) => {
  //     const salt = await bcrypt.genSalt();
  //     const hashedPassword = await bcrypt.hash(user.password, salt);

  //     const { name, email } = user;
  //     const newUser = await User.create({
  //       name,
  //       email,
  //       password: hashedPassword,
  //     });

  //     return newUser;
  //   })
  // );

  // clear conversations

  // clear messages
};

reset();
