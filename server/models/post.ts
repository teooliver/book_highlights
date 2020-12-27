import mongoose, { Schema } from "mongoose";
import IPost from "../interfaces/post";

const PostSchema: Schema = new Schema(
  {
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model<IPost>("Post", PostSchema, "posts");

export { Post };
