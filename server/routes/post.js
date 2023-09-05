const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

//TODO: Implement restful api's
router.post("/post-upload/:token", postController.postUpload);

router.get("/post-fetch/:token", postController.postFetch);

module.exports = router;
