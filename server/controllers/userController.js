const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const cloudinaryConn = require("../utils/cloudinaryConn.js");

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
        });
        return res.json({ status: 201, message: "User created successfully." });
      }
    } catch (err) {
      return res.json({ status: 500, message: "Internal Server Error." });
    }
  },
  login: async (req, res) => {
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
  },
  forgotPassword: async (req, res) => {
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

      // transporter.verify(function (error, success) {
      //   if (error) {
      //     console.log(error.message);
      //   } else {
      //     console.log("Server is ready to take our messages");
      //   }
      // });

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
  },
  resetPassword: async (req, res) => {
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
      return res.json({ status: 200, message: "Password successfully reset." });
    } else {
      return res.json({ status: 400, message: "Password could not be reset." });
    }
  },
  tokenValidation: async (req, res) => {
    const { token } = req.params;

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
  },
  imageUpload: async (req, res) => {
    const { imageToUpload } = req.body;
    const uploadedResp = await cloudinaryConn.uploader.upload(imageToUpload, {
      upload_preset: "images",
    });
  },
};

module.exports = userController;
