const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const cloudinary = require("../utils/cloudinaryConn.js");
const cloudinaryBuildURL = require("cloudinary-build-url");

const userController = {
  signup: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email }).exec();

      if (user) {
        return res.json({ status: 400, message: "User already exists." });
      } else {
        await User.create({
          email: req.body.email,
          username: req.body.username,
          fullname: req.body.fullname,
          password: req.body.password,
        })
          .then((createdUser) => {
            let token = jwt.sign(
              {
                email: createdUser.email,
                password: createdUser.password,
              },
              "f3o2fvmdlleo"
            );
            return res.json({
              status: 201,
              message: "User created successfully.",
              user: token,
            });
          })
          .catch((error) => {
            res.status(400);
          });
      }
    } catch (err) {
      return res.json({ status: 500, message: "Internal Server Error." });
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      }).exec();

      if (user) {
        const compare = await user.passwordValidate(req.body.password);
        if (compare) {
          const token = jwt.sign(
            {
              email: user.email,
              password: user.password,
            },
            "f3o2fvmdlleo"
          );
          return res.json({
            status: 200,
            user: token,
            message: "User logged in successfully.",
          });
        }
        return res.json({
          status: 400,
          user: false,
          message: "Invalid Password.",
        });
      } else {
        return res.json({
          status: 400,
          user: false,
          message: "User does not exist.",
        });
      }
    } catch {
      return res.json({
        status: 404,
        user: false,
        message: "Could not reach server",
      });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      }).exec();

      if (user) {
        var transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          service: "gmail",
          auth: {
            user: "farooqhaider561@gmail.com",
            pass: "ofdumairqladpzmq",
          },
        });

        const token = jwt.sign({ email: req.body.email }, "f3o2fvmdlleo");
        const encodedJwt = encodeURIComponent(token);

        var mailOptions = {
          from: "farooqhaider561@gmail.com",
          to: user.email,
          subject: "Reset your Password - Instagram",
          text: `http://127.0.0.1:5173/reset-password/${encodedJwt}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("SENT SUCCESSFUL " + info.response);
          }
        });

        res.json({ status: 200, message: "Recovery email sent successfully." });
      } else {
        res.json({ status: 400, message: "Provided email is invalid." });
      }
    } catch {
      return res.json({
        status: 404,
        message: "Could not connect to email service",
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const payload = jwt.decode(token, "f3o2fvmdlleo");
      const emailToFind = payload.email;
      const newPasswordValue = await bcrypt.hash(req.body.password, 10);

      const user = await User.findOneAndUpdate(
        { email: emailToFind },
        { password: newPasswordValue },
        { new: true }
      );
      if (user) {
        return res.json({
          status: 200,
          message: "Password successfully reset.",
        });
      } else {
        return res.json({
          status: 400,
          message: "Password could not be reset.",
        });
      }
    } catch {
      return res.json({
        status: 401,
        msg: "Password could not be reset",
      });
    }
  },
  tokenValidation: async (req, res) => {
    try {
      const rawToken = req.headers["authorization"];
      if (rawToken) {
        const token = req.headers["authorization"].slice(7);

        const payload = jwt.decode(token, "f3o2fvmdlleo");
        const emailToFind = payload.email;
        const user = await User.findOne({
          email: emailToFind,
        }).exec();

        if (user) {
          return res.json({ status: 200, message: "User has been found." });
        } else {
          return res.json({
            status: 401,
            message: "Could not validate user, entry prohibitted.",
          });
        }
      } else {
        return res.json({
          status: 401,
          message: "Could not validate user, entry prohibitted.",
        });
      }
    } catch (err) {
      return res.json({
        status: 401,
        message: "Could not validate user, entry prohibitted.",
      });
    }
  },
  profileImageUpload: async (req, res) => {
    try {
      const newProfilePic = req.body.image;

      const token = req.headers["authorization"].slice(7).slice(7);
      const payload = jwt.decode(token, "f3o2fvmdlleo");
      const emailToFind = payload.email;
      const user = await User.findOne({ email: emailToFind });

      const oldProfilePictureSecureURL = user.display_picture;

      const uploadedResp = await cloudinary.uploader.upload(newProfilePic, {
        folder: "user_profile_images",
        upload_preset: "user_images",
      });

      const oldProfilePicture = cloudinaryBuildURL.extractPublicId(
        oldProfilePictureSecureURL
      );

      cloudinary.uploader.destroy(oldProfilePicture, (error, result) => {
        if (error) {
          console.error("Error deleting image:", error);
        } else {
          console.log("Image deleted successfully:", result);
        }
      });

      const pictureURL = uploadedResp.secure_url;
      user.display_picture = pictureURL;

      await user.save();

      return res.json({ status: 201, message: "Image Uploaded Successfully" });
    } catch (err) {
      return res.json({
        status: 404,
        message: "Could not connect to the host.",
      });
    }
  },
  // TODO: implement fetchProflePicutre
  fetchProfileInfo: async (req, res) => {
    try {
      const { token } = req.params;
      const payload = jwt.decode(token, "f3o2fvmdlleo");
      const emailToFind = payload.email;
      const user = await User.findOne({
        email: emailToFind,
      }).exec();
      return res.json({
        status: 200,
        followers: user.followers.length,
        following: user.following.length,
        username: user.username,
        fullname: user.fullname,
        postCount: user.posts.length,
      });
    } catch (err) {
      return res.json({
        status: 404,
        message: "User profile could not be fetched, not found",
      });
    }
  },
  fetchProfilePicture: async (req, res) => {
    try {
      const { token } = req.params;
      const payload = jwt.decode(token, "f3o2fvmdlleo");
      const emailToFind = payload.email;
      const user = await User.findOne({
        email: emailToFind,
      }).exec();

      return res.json({
        status: 200,
        display_picture: user.display_picture,
      });
    } catch (err) {
      return res.json({
        status: 404,
      });
    }

    // TODO: change the name of the attribute in model from display_picture to profile_picture
  },
  searchUsers: async (req, res) => {
    try {
      const searchQuery = req.body.searchQuery;
      const users = await User.find({
        username: { $regex: searchQuery },
      });

      return res.json({
        status: 200,
        result: users,
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  tokenizeSearchedUser: async (req, res) => {
    try {
      const searchedUserToken = jwt.sign(
        {
          email: req.body.email,
          password: req.body.password,
        },
        "f3o2fvmdlleo"
      );

      return res.json({
        status: 200,
        searchedUserToken: searchedUserToken,
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  fetchUserId: async (req, res) => {
    try {
      const token = req.headers["authorization"].slice(7);
      const payload = jwt.decode(token, "f3o2fvmdlleo");
      const emailToFind = payload.email;
      const user = await User.findOne({
        email: emailToFind,
      }).exec();

      return res.json({
        status: 200,
        userId: user._id,
      });
    } catch {
      return res.json({
        status: 400,
      });
    }
  },
};

module.exports = userController;
