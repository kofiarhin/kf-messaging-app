const { Router } = require("express");
const { addContact } = require("../controllers/contactController");
const { auth } = require("../middlewares/authMiddleware");

const router = Router();

router.post("/add", auth, addContact);

module.exports = router;
