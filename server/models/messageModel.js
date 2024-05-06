const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Conversation",
    },
    messages: {
      type: [
        {
          senderId: { type: mongoose.Schema.Types.ObjectId },
          content: String,
          createdAt: {
            type: Date,
            default: () => Date.now(),
          },
          read: { type: Boolean, default: false },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
