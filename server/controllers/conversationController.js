const Conversation = require("../models/converstationModel");
const User = require("../models/userModel");
const Contact = require("../models/contactModel");
const Message = require("../models/messageModel");
const createConversation = async (req, res, next) => {
  try {
    // create conversation
    const conversation = await Conversation.create({
      participants: [req.user._id, req.body.senderId],
    });

    const participants = conversation.participants;
    const conversationId = conversation._id;

    // create message
    const messageMap = await Promise.all(
      participants.map(async (participant) => {
        const message = await Message.create({
          userId: participant,
          conversationId,
          messages: [
            { content: req.body.content, senderId: req.body.senderId },
          ],
        });
      })
    );

    const usersUpdate = await Promise.all(
      participants.map(async (participant) => {
        const user = await User.findByIdAndUpdate(participant, {
          $push: { conversations: participant },
        });
        return user;
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

module.exports = {
  createConversation,
  deleteConversation,
};
