const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/submit-comment", commentController.submitComment);
router.post("/fetch-comments", commentController.fetchComments);
router.post("/toggle-comment-like", commentController.toggleCommentLike);
router.get("/fetch-comment-likes/:commentId", commentController.fetchCommentLikes);

module.exports = router;
