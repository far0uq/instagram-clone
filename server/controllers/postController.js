const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinaryConn.js");

const postController = {
  postUpload: async (req, res) => {
    try {
      const postToUpload = req.body.post;
      console.log(
        "🚀 ~ file: userController.js:165 ~ imageUpload: ~ postToUpload:",
        postToUpload
      );

      foreach(async (imageToUpload) => {
        const uploadedResp = await cloudinary.uploader.upload(imageToUpload, {
          folder: "post_images",
          upload_preset: "user_images",
        });
      });

      return res.json({ status: 201, message: "Post Uploaded Successfully" });
    } catch (err) {
      return res.json({
        status: 404,
        message: "Could not connect to the host.",
      });
    }
  },
};

module.exports = postController;
