const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const userController = {
  signup: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email }).exec();

      if (user) {
        return res.json({ status: "failed" });
      } else {
        await User.create({
          email: req.body.email,
          username: req.body.username,
          fullname: req.body.fullname,
          password: req.body.password,
        });
        return res.json({ status: "ok" });
      }
    } catch (err) {
      return res.json({ status: "failed" });
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
        return res.json({ status: "ok", user: token });
      }
      return res.json({ status: "error", user: false });
    } else {
      return res.json({ status: "error", user: false });
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

      transporter.verify(function (error, success) {
        if (error) {
          console.log(error.message);
        } else {
          console.log("Server is ready to take our messages");
        }
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

      res.json({ status: "ok" });
    } else {
      res.json({ status: "failed" });
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
      return res.json({ status: "ok" });
    } else {
      return res.json({ status: "failed" });
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
      return res.json({ status: "ok" });
    } else {
      return res.json({ status: "failed" });
    }
  },
};

module.exports = userController;
