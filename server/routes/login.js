const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

router.post("/", async (req, res) => {
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
});

module.exports = router;
