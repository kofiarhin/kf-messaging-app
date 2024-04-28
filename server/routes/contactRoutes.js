const { Router } = require("express");

const {
  createContact,
  deleteContact,
  updateContact,
  getContacts,
} = require("../controllers/contactController");
const { auth } = require("../middlewares/authMiddleware");

const router = Router();
router.get("/", auth, getContacts);
router.post("/", auth, createContact);
router.delete("/", auth, deleteContact);
router.put("/", auth, updateContact);

module.exports = router;
