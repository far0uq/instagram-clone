const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// * signup
router.post("/signup", userController.signup);

// * login
router.post("/login", userController.login);

// * forgot-password
router.post("/forgot-password", userController.forgotPassword);

// * reset-password
router.post("/reset-password/:token", userController.resetPassword);

// * token-validation
router.post("/token-validation/:token", userController.tokenValidation);

module.exports = router;
