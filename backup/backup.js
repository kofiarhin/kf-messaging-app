require("dotenv").config();
const connectDB = require("../server/config/db");
const User = require("../server/models/userModel");
const Conversation = require("../server/models/converstationModel");
const Message = require("../server/models/messageModel");
const Contact = require("../server/models/contactModel");
const fs = require("fs");
const path = require("path");

// connect database
connectDB();

const writeToFile = async (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data));
  console.log("data written to", path);
};

const readFromFile = async (path) => {
  const data = fs.readFileSync(path, "utf-8");
  return JSON.parse(data);
};

const create = async (collection, data, name) => {
  const res = await collection.insertMany(data);
};

const run = async () => {
  try {
    // const users = await User.find();
    const usersPath = path.join(__dirname, ".", "data", "users.txt");
    const messagePath = path.join(__dirname, ".", "data", "message.txt");
    const contactPath = path.join(__dirname, ".", "data", "contact.txt");
    const conversationPath = path.join(
      __dirname,
      ".",
      "data",
      "conversation.txt"
    );

    const users = await User.find();
    const conversations = await Conversation.find();
    const messages = await Message.find();
    const contacts = await Contact.find();

    const usersData = await readFromFile(usersPath);
    const contactsData = await readFromFile(contactPath);
    const messagesData = await readFromFile(messagePath);
    const conversationsData = await readFromFile(conversationPath);

    // create conversations

    create(User, usersData, "users");
    create(Conversation, conversationsData, "conversation");
    create(Message, messagesData, "message");
    create(Contact, contactsData, "contact");

    console.log("database updated");
  } catch (error) {
    console.log(error);
  }
};

run();
