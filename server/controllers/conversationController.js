const Conversation = require("../models/converstationModel");
const User = require("../models/userModel");
const Contact = require("../models/contactModel");
const Message = require("../models/messageModel");

const createConversation = async (req, res, next) => {
  try {
    const participants = [req.user._id, req.body.userId];
    const conversation = new Conversation({
      participants,
    });

    const { _id: conversationId } = conversation;

    const updateUserConversatio = await Promise.all(
      participants.map(async (participant) => {
        const userUpdate = await User.findByIdAndUpdate(participant, {
          $push: { conversations: conversationId },
        });

        return userUpdate;
      })
    );
    return res.json(conversation);
  } catch (error) {
    next(error);
  }
};

const deleteConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findByIdAndDelete(req.params.id);

    // update users conversation
    const user = await User.findByIdAndUpdate(req.user._id, {
      $pull: { conversations: req.params.id },
    });
    return res.json({ conversationId: req.params.id });
  } catch (error) {
    next(error);
  }
};

const getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) {
      res.status(400);
      throw new Error("conversation not found");
    }
    return res.json(conversation);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConversation,
  deleteConversation,
  getConversation,
};
