const jwt = require("jsonwebtoken");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");
const cloudinary = require("../utils/cloudinaryConn.js");
const cloudinaryBuildURL = require("cloudinary-build-url");

const postController = {
  postUpload: async (req, res) => {
    try {
      const postToUpload = req.body.post;

      postImages = [];
      for (image of postToUpload) {
        const uploadedResp = await cloudinary.uploader.upload(image, {
          folder: "post_images",
          upload_preset: "user_images",
        });
        postImages.push({
          image_url: uploadedResp.secure_url,
        });
      }

      const currentDate = new Date();
      const post = await Post.create({
        created_at: currentDate,
        liked_by: [],
        images: postImages,
      });
      const token = req.headers["authorization"].slice(7);
      const payload = jwt.decode(token, "f3o2fvmdlleo");
      const emailToFind = payload.email;
      await User.findOneAndUpdate(
        { email: emailToFind },
        { $push: { posts: post._id } },
        { new: true }
      );

      return res.json({ status: 201, message: "Post Uploaded Successfully" });
    } catch (err) {
      console.log(err);
      return res.json({
        status: 404,
        message: "Could not connect to the host.",
      });
    }
  },
  postFetch: async (req, res) => {
    try {
      const { token } = req.params;
      const payload = jwt.decode(token, "f3o2fvmdlleo");
      const emailToFind = payload.email;
      const user = await User.findOne({ email: emailToFind.trim() }).populate(
        "posts"
      );

      const posts = user.posts;
      return res.json({
        status: 200,
        posts: posts,
      });
    } catch (err) {
      console.log(err);
      return res.json({
        status: 404,
        message: "Could not connect to the host.",
      });
    }
  },
  likeToggle: async (req, res) => {
    try {
      const token = req.headers["authorization"].slice(7);
      const payload = jwt.decode(token, "f3o2fvmdlleo");
      const emailToFind = payload.email;
      const user = await User.findOne({ email: emailToFind });

      if (req.body.liked === true) {
        const post = await Post.findOneAndUpdate(
          { _id: req.body.postId },
          { $push: { liked_by: user._id } },
          { new: true }
        );
        return res.json({
          status: 200,
          count: post.liked_by.length,
        });
      } else if (req.body.liked === false) {
        const post = await Post.findOneAndUpdate(
          { _id: req.body.postId },
          { $pull: { liked_by: user._id } },
          { new: true }
        );
        return res.json({
          status: 200,
          count: post.liked_by.length,
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
  postDelete: async (req, res) => {
    try {
      const { selectedPostId } = req.params;

      const post = await Post.findOne({
        _id: selectedPostId,
      }).exec();

      const images = post.images;

      images.forEach((image) => {
        const imagePublicId = cloudinaryBuildURL.extractPublicId(
          image.image_url
        );

        cloudinary.uploader.destroy(imagePublicId, (error, result) => {
          if (error) {
            console.error("Error deleting image:", error);
          } else {
            console.log("Image deleted successfully:", result);
          }
        });
      });

      const comments = post.comments;

      comments.forEach(async (comment) => {
        await Comment.findByIdAndDelete({
          _id: comment._id,
        });
      });

      const token = req.headers["authorization"].slice(7);
      const payload = jwt.decode(token, "f3o2fvmdlleo");
      const emailToFind = payload.email;
      const user = await User.findOne({ email: emailToFind });

      await User.findOneAndUpdate(
        { email: user.email },
        { $pull: { posts: selectedPostId } }
      );

      await Post.findByIdAndDelete(selectedPostId);

      return res.json({
        status: 200,
      });
    } catch (err) {
      return res.json({ status: 404, msg: err });
    }
  },
};

module.exports = postController;
