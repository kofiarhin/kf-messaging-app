const User = require("../models/userModel");
const Contact = require("../models/contactModel");
const Conversation = require("../models/converstationModel");

const createContact = async (req, res, next) => {
  try {
    const { email } = req.body;
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("user does not exist");
    }

    // check if  user is storing own id
    const ownId = req.user._id == user._id.toString();

    if (ownId) {
      res.status(400);
      throw new Error("you cannot store own email as contact");
    }
    // check if user id already stored
    const check = req.user.contacts.find(
      (contact) => contact.userId.toString() === user._id.toString()
    );

    if (check) {
      res.status(400);
      throw new Error("you have already added user");
    }

    // check if user is already in a conversation with contact if usedr is already in a conversation use that conversation id
     let conversation;
    const userOne = req.user._id;
    const userTwo = user._id;

    conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, user._id] }
    })


    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        participants: [req.user._id, user._id],
      });

      const { _id: conversationId, participants } = conversation;

    // update user conversations
    const conUpdates = await Promise.all(
      participants.map(async (participant) => {
        const userConUpdate = await User.findByIdAndUpdate(
          participant,
          { $push: { conversations: conversationId } },
          { new: true }
        );
      })
    );
    }

    
    // update user contacts
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          contacts: {
            userId: user._id,
            username: req.body.username ? req.body.username : user.name,
            conversationId: conversation._id,
          },
        },
      },
      { new: true }
    );

    return res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { contacts: { userId: req.body.userId } } },
      { new: true }
    );
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

// update contacts
const updateContact = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id, "contacts.userId": req.body.userId },
      {
        $set: {
          "contacts.$": req.body,
        },
      },
      { new: true }
    );
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "contacts.userId",
      select: "name email",
    });
    const contacts = user.contacts;

    return res.json(contacts);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createContact,
  deleteContact,
  updateContact,
  getContacts,
};
