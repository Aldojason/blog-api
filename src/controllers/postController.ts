import { Request, Response } from "express";
import type { Post } from "../models/postModel";
import { ApiError } from "../utils/apiError";


// In-memory posts array with type
let posts: Post[] = [
  {
    id: 1,
    title: "First Post",
    content: "Hello world!",
    createdAt: new Date().toISOString()
  }
];


export const getAllPosts = (req: Request, res: Response) => {
  res.status(200).json(posts);
};

export const getPostById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.status(200).json(post);
};


export const createPost = (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newPost: Post = {
    id: Date.now(),
    title,
    content,
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);

  res.status(201).json(newPost);
};



export const updatePost = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;

  const postIndex = posts.findIndex(p => p.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  posts[postIndex] = {
    ...posts[postIndex],
    title,
    content
  };

  res.status(200).json(posts[postIndex]);
};


export const deletePost = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const postExists = posts.some(p => p.id === id);
  if (!postExists) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts = posts.filter(p => p.id !== id);

  res.status(200).json({ message: "Post deleted successfully" });
};
