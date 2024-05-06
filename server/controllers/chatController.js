const Conversation = require("../models/converstationModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const getChats = async (req, res, next) => {
  try {
    // get list of conversations
    const conversations = await Conversation.find({
      participants: req.user._id,
    }).select("_id createdAt updatedAt participants");

    const data = await Promise.all(
      conversations.map(async (conversation) => {
        const participants = conversation.participants;

        // get details of participant
        const indexOfUser = participants.indexOf(req.user._id);

        const otherUserId = participants[participants.length - 1 - indexOfUser];

        const otherUser = await User.findById(otherUserId).select(
          "name email _id"
        );
        const conMessages = await Message.findOne({
          conversationId: conversation._id,
        }).select("messages creeatedAt updatedAt");

        if (conMessages) {
          const { messages, updatedAt: messageUpdatedAt } = conMessages;

          return {
            conversationId: conversation._id,
            participants: conversation.participants,
            participant: otherUser,
            messages,
            createdAt: conversation.createdAt,
            updatedAt: messageUpdatedAt,
          };
        } else {
          return {
            conversationId: conversation._id,
            participants: conversation.participants,
            messages: [],
            createdAt: conversation.createdAt,
            updatedAt: conversation.updatedAt,
            participant: otherUser,
          };
        }
      })
    );

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getChats,
};
