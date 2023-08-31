const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    post_id: {
      type: String,
      required: true,
      unique: true,
    },
    created_at: {
      type: Date,
      required: true,
    },
    liked_by: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    images: [
      {
        image_id: {
          type: String,
          required: true,
          unique: true,
        },
        image_url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { collection: "post" }
);

const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;
