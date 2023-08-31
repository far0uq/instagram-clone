const jwt = require("jsonwebtoken");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const cloudinary = require("../utils/cloudinaryConn.js");
const uuid = require("uuid");

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
          image_id: uuid.v4(),
          image_url: uploadedResp.secure_url,
        });
      }

      const currentDate = new Date();
      const postId = uuid.v4();
      const post = await Post.create({
        post_id: postId,
        created_at: currentDate,
        liked_by: [],
        images: postImages,
      });
      // TODO: tweak api so that saving profile picture deletes previous one from cloudinary
      const { token } = req.params;
      const payload = jwt.decode(token, "f3o2fvmdlleo");
      const emailToFind = payload.email;
      await User.findOneAndUpdate(
        { email: emailToFind },
        { $push: { posts: post.post_id } },
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
};

module.exports = postController;
