import mongoose from "mongoose";
import { Post } from "../models/post.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await Post.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = (req, res) => {
  const post = req.body;
  console.log("Post", post);
  const newPost = new Post(post);
  console.log("NewPost", newPost);
  try {
    newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id.toString()))
    return res.status(404).send("No post with that id");

  const updatedPost = await Post.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id.toString()))
    return res.status(404).send("No post with that id");

  const deletedPost = await Post.findByIdAndRemove(_id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id.toString()))
    return res.status(404).send("No post with that id");

  const post = await Post.findById(_id);

  const updatedPost = await Post.findByIdAndUpdate(
    _id,
    {
      likeCount: post.likeCount + 1,
    },
    {
      new: true,
    }
  );

  res.json({ message: "Like post success" });
};
