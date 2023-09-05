const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

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

// * image-upload
router.post("/profile-image-upload/:token", userController.profileImageUpload);

// * post-upload
router.post("/post-upload", postController.postUpload);

// * fetch-profile
router.post("/fetch-profile-info/:token", userController.fetchProfileInfo);

// * fetch-profile-picture
router.get("/fetch-profile-picture/:token", userController.fetchProfilePicture);

module.exports = router;
