const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    display_picture: {
      type: String,
      required: false,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { collection: "user" }
);

UserSchema.methods.passwordValidate = async function (password) {
  const compareResult = bcrypt.compare(password, this.password);
  return compareResult;
};

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
