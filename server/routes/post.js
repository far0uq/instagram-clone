const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// * token-validation
router.post("/post-upload/:token", postController.postUpload);

module.exports = router;
