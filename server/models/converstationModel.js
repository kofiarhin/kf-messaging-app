const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  messages: [
    {
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      timestamp: { type: Date, default: Date.now },
      content: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Conversation", conversationSchema);
