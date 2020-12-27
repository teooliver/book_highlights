import { Post, PostFormData, UpdatePostData } from "../types/posts";

export const API_URL = "http://localhost:5000/posts";

// export const fetchPosts = () => axios.get(url);
// export const createPost = () => axios.post(url, newPost);

export const createPost = async (newPostData: PostFormData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPostData),
  }).then((res) => res.json());

  return res as Post[];
};

export const updatePost = async (post: UpdatePostData) => {
  const res = await fetch(`${API_URL}/${post.id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post.postData),
  }).then((res) => res.json());

  return res as Post;
};

export const fetchPosts = async () => {
  const res = await fetch(API_URL).then((res) => res.json());
  return res as Post[];
};

export const deletePost = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const likePost = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}/likePost`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return res as Post;
};
