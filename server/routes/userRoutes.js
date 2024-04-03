const { Router } = require("express");
const { getUser } = require("../controllers/userController");

const router = Router();

router.get("/", getUser);

module.exports = router;
