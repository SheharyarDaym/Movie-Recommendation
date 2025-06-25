const express = require("express");
const router = express.Router();
const { login, signup, profile } = require("../controllers/userController");
const { verifyToken } = require("../middleware/userMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/profile", verifyToken, profile);

module.exports = router;