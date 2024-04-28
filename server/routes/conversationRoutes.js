const { Router } = require("express");
const {
  createConversation,
  getConversation,
} = require("../controllers/conversationController");
const { auth } = require("../middlewares/authMiddleware");
const router = Router();

router.post("/", auth, createConversation);
router.get("/:id", getConversation);
module.exports = router;
