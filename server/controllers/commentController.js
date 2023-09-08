const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const mongoose = require("mongoose");

const commentController = {
  submitComment: async (req, res) => {
    try {
      const token = req.headers["authorization"].slice(7);
      const payload = jwt.decode(token, "f3o2fvmdlleo");
      const emailToFind = payload.email;
      const user = await User.findOne({
        email: emailToFind,
      }).exec();

      const { commentContent } = req.body;
      const currentDate = new Date();
      const comment = new Comment({
        created_by: user._id,
        created_at: currentDate,
        comment_content: commentContent,
        liked_by: [],
      });

      let commentId = "";

      await comment
        .save()
        .then((savedComment) => {
          commentId = new mongoose.Types.ObjectId(savedComment._id);
        })
        .catch((error) => {
          throw new Error(error);
        });

      const { postId } = req.body;

      await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: commentId } },
        { new: true }
      );

      return res.json({ status: 200 });
    } catch (err) {
      res.json({
        status: 505,
      });
    }
  },
  fetchComments: async (req, res) => {
    try{
const { postId } = req.body;
    const post = await Post.findOne({ _id: postId }).populate({
      path: "comments",
      populate: {
        path: "created_by",
        model: "user",
      },
    });

    const comments = post.comments;
    return res.json({
      status: 200,
      comments: comments,
    });
    }
    catch(err) {
      return res.json({
      status: 404,
      comments: "Could not fetch comments",
    });
    }
  },
  toggleCommentLike: async (req, res) => {
    try {
      const token = req.headers["authorization"].slice(7);
      const payload = jwt.decode(token, "f3o2fvmdlleo");
      const emailToFind = payload.email;
      const user = await User.findOne({ email: emailToFind });

      if (req.body.liked === true) {
        const comment = await Comment.findOneAndUpdate(
          { _id: req.body.commentId },
          { $push: { liked_by: user._id } },
          { new: true }
        );
        return res.json({
          status: 200,
          count: comment.liked_by.length,
        });
      } else if (req.body.liked === false) {
        const comment = await Comment.findOneAndUpdate(
          { _id: req.body.commentId },
          { $pull: { liked_by: user._id } },
          { new: true }
        );
        return res.json({
          status: 200,
          count: comment.liked_by.length,
        });
      }
    } catch (err) {
      console.log(err);
      return res.json({
        status: 404,
        message: "Could not connect to the host.",
      });
    }
  },
  fetchCommentLikes: async (req, res) => {
    try {
      const { commentId } = req.params;
      const comment = await Comment.findOne({ _id: commentId });
      return res.json({
        status: 200,
        count: comment.liked_by.length,
      });
    } catch (err) {
      console.log(err);
      return res.json({
        status: 404,
        message: "Could not connect to the host.",
      });
    }
  },
};

module.exports = commentController;
