const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

router.post("/:token", async (req, res) => {
  const { token } = req.params;
  const payload = jwt.decode(token, "f3o2fvmdlleo");
  const emailToFind = payload.email;
  const newPasswordValue = await bcrypt.hash(req.body.password, 10);

  const user = await User.findOneAndUpdate(
    { email: emailToFind },
    { password: newPasswordValue },
    { new: true }
  );
  if(user){
      return res.json({status:'ok'})
  }
  else{
      return res.json({status:'failed'})
  }
});

module.exports = router;
