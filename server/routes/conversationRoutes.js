const { Router } = require("express");
const { createConversation } = require("../controllers/conversationController");
const { auth } = require("../middlewares/authMiddleware");
const router = Router();

router.post("/", auth, createConversation);
module.exports = router;
