const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.post("/forgot-password", userController.forgotPassword);

router.post("/reset-password/:token", userController.resetPassword);

router.post("/token-validation/:token", userController.tokenValidation);

router.post("/profile-image-upload/:token", userController.profileImageUpload);

router.post("/post-upload", postController.postUpload);

router.post("/fetch-profile-info/:token", userController.fetchProfileInfo);

router.get("/fetch-profile-picture/:token", userController.fetchProfilePicture);

router.post("/search-user", userController.searchUsers);

router.post("/tokenize-searched-user", userController.tokenizeSearchedUser);

module.exports = router;
