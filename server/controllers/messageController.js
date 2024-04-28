const Message = require("../models/messageModel");

const createMessage = async (req, res, next) => {
  try {
    const { conversationId, senderId, content } = req.body;

    // check if conversation id already exist
    const checkConversation = await Message.findOne({ conversationId});

    if(!checkConversation) {
      const message = await Message.create({
        conversationId,
        messages: [{ senderId, content }],
      })
      return res.json(message);
    } 

     const conversationUpdate = await Message.findOneAndUpdate({conversationId}, {
      $push: { messages: { senderId, content} }
     }, { new: true});

    

    return res.json(conversationUpdate)

    
  } catch (error) {
    next(error);
  }
};

// update conversation
const updateMessages = async (req, res, next) => {
  try {
    const { conversationId, senderId, content } = req.body;

    const messageUpdate = await Message.findOneAndUpdate(
      { conversationId },
      {
        $push: {
          messages: { senderId, content },
        },
      },
      { new: true }
    );

    return res.json(messageUpdate);
  } catch (error) {
    next(error);
  }
};
const getMessages = async(req, res, next) => {

   
  try {
    const { conversationId } = req.query; 
     const messages = await Message.findOne({conversationId}).populate("conversationId");
     return res.json(messages)
  } catch (error) {
      next(error)
  }
}

module.exports = { createMessage, updateMessages, getMessages };
