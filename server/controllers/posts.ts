import mongoose from "mongoose";
import { Post } from "../models/post";
import { Request, Response } from "express";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const postMessages = await Post.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = (req: Request, res: Response) => {
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

export const updatePost = async (req: Request, res: Response) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id.toString()))
    return res.status(404).send("No post with that id");

  const updatedPost = await Post.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id.toString()))
    return res.status(404).send("No post with that id");

  const deletedPost = await Post.findByIdAndRemove(_id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req: Request, res: Response) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id.toString()))
    return res.status(404).send("No post with that id");

  try {
    const post = await Post.findById(_id);

    if (!post) {
      return;
    }
    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      {
        likeCount: post.likeCount + 1,
      },
      {
        new: true,
      }
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

  res.json({ message: "Like post success" });
};
