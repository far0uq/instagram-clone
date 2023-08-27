const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// * token-validation
router.post("/image-upload", postController.postUpload);

module.exports = router;
