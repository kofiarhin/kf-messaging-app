const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    conversations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
      },
    ],
    contacts: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        blocked: {
          type: Boolean,
          default: false,
        },
        conversationId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
