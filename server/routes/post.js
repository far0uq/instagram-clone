const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

//TODO: Implement restful api's
router.post("/post-upload", postController.postUpload);
router.get("/post-fetch/:token", postController.postFetch);
router.post("/toggle-like", postController.likeToggle);
router.delete("/post-delete/:selectedPostId", postController.postDelete);

module.exports = router;
