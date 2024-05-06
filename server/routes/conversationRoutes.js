const { Router } = require("express");
const {
  createConversation,
  getConversation,
  getConversations,
} = require("../controllers/conversationController");
const { auth } = require("../middlewares/authMiddleware");
const router = Router();

router.get("/", auth, getConversations);
router.get("/:id", getConversation);
router.post("/", auth, createConversation);
module.exports = router;
