const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

router.post("/", async (req, res) => {
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
});

module.exports = router;
