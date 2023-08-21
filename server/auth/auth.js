const passport = require("passport");
const localStategy = require("passport-local").localStategy;
const UserModel = require("../models/user");

passport.use(
  "signup",
  new localStategy({
    emailField: "email",
    usernameField: "username",
    fullnameField: "fullname",
    passwordField: "password",
  },async (email,username,fullname,password,done) => {
      try{
        const user = await UserModel.create({email,username,fullname,password});
        return done(null,user);
      }catch(err){
        console.err(err);
      }
  })
);
