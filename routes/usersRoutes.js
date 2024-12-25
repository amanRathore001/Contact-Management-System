const express = require("express");
const { registerUser, loginUser, currentUserInfo } = require("../controllers/userController");
const validateToken = require("../middlewares/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser)

router.post("/login", loginUser)


router.get("/current", validateToken, currentUserInfo)

module.exports = router;