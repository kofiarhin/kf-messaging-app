const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Conversation"
  },
  messages: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId },
      content: String,
      timestamp: { type: Date, Default: Date.now },
      read: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("Message", messageSchema);
