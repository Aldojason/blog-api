"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getAllPosts = void 0;
// In-memory posts array with type
let posts = [
    {
        id: 1,
        title: "First Post",
        content: "Hello world!",
        createdAt: new Date().toISOString()
    }
];
const getAllPosts = (req, res) => {
    res.status(200).json(posts);
};
exports.getAllPosts = getAllPosts;
const getPostById = (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
};
exports.getPostById = getPostById;
const createPost = (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }
    const newPost = {
        id: Date.now(),
        title,
        content,
        createdAt: new Date().toISOString()
    };
    posts.push(newPost);
    res.status(201).json(newPost);
};
exports.createPost = createPost;
const updatePost = (req, res) => {
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
exports.updatePost = updatePost;
const deletePost = (req, res) => {
    const id = Number(req.params.id);
    const postExists = posts.some(p => p.id === id);
    if (!postExists) {
        return res.status(404).json({ message: "Post not found" });
    }
    posts = posts.filter(p => p.id !== id);
    res.status(200).json({ message: "Post deleted successfully" });
};
exports.deletePost = deletePost;
