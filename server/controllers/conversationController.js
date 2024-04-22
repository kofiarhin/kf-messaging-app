const Conversation = require("../models/converstationModel");
const User = require("../models/userModel");
const Contact = require("../models/contactModel");
const createConversation = async (req, res, next) => {
  try {
    // create conversation
    const conversation = await Conversation.create({
      participants: [req.user._id, req.body.senderId],
      messages: [{ senderId: req.body.senderId, content: req.body.content }],
    });

    const conversationId = conversation._id;
    const particapants = conversation.participants;
    const usersUpdate = await Promise.all(
      particapants.map(async (participant) => {
        const user = await User.findByIdAndUpdate(participant, {
          $push: { conversations: participant },
        });
        return user;
      })
    );

    console.log(res);

    // //  update sender converstaion
    // // update users conversations
    // const senderConvo = await User.findByIdAndUpdate(
    //   req.user._id,
    //   {
    //     $push: { conversations: conversationId },
    //   },
    //   { new: true }
    // );

    // // console.log(senderConvo);
    // const receiverConvo = await User.findByIdAndUpdate(
    //   req.body.senderId,
    //   {
    //     $push: { conversations: conversationId },
    //   },
    //   { new: true }
    // );

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
