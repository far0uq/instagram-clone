const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/", async (req, res) => {
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
});

module.exports = router;
