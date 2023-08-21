const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

router.post("/:token", async (req, res) => {
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
});

module.exports = router;
