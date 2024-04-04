const { Router } = require("express");
const { auth } = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
} = require("../controllers/authController");
const router = Router();

router.post("/register", registerUser);
router.get("/logout", logoutUser);
router.get("/profile", auth, getProfile);
router.post("/login", loginUser);
module.exports = router;
