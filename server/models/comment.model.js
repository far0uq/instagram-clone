const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    created_at: {
      type: Date,
      required: true,
    },
    comment_content: {
      type: String,
      required: true,
    },
    liked_by: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { collection: "comment" }
);

const CommentModel = mongoose.model("comment", CommentSchema);

module.exports = CommentModel;
