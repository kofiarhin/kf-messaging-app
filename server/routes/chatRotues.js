const { Router } = require("express");
const { auth } = require("../middlewares/authMiddleware");
const { getChats } = require("../controllers/chatController");
const router = Router();

// get chat data
router.get("/", auth, getChats);

module.exports = router;
