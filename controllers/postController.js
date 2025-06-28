const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
};

exports.createPost = async (req, res) => {
    const { title, content, author} = req.body;
    const newPost = new Post({ title, content, author});
    await newPost.save();
    res.status(201).json(newPost);
};

exports.getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'No encontrado' });
    res.json(post);
};

exports.updatePost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
};

exports.deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post eliminado' });
};
