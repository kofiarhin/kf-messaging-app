const { Router } = require("express");
const { auth } = require("../middlewares/authMiddleware");
const router = Router();
const {
  createMessage,
  updateMessages,
  getMessages
} = require("../controllers/messageController");

router.get("/", getMessages)
router.post("/", auth, createMessage);
router.put("/", auth, updateMessages);

module.exports = router;
