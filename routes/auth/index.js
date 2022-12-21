const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth");

// POST - sign in user
router.post("/signin", authController.postSignIn);

// POST - sign up user
router.post("/signup", authController.postSignUp);

module.exports = router;
