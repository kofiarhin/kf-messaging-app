const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: String,
  blocked: {
    type: Boolean,
    default: false,
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
  },
});

module.exports = mongoose.model("Contact", contactSchema);
