const Post = require("../models/Post");
const User = require("../models/User");

// GET /posts/
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// POST /posts/
const createPost = async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    const user = await User.findById(authorId);
    if (!user) return res.status(400).json({ error: "El usuario no existe" });

    const newPost = new Post({ title, content, authorId });
    const savedPost = await newPost.save();

    await User.findByIdAndUpdate(authorId, { $push: { posts: savedPost._id } });

    res.json({ mensaje: "Post creado exitosamente", postId: savedPost._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// PUT /posts/:id
const updatePost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.json({ mensaje: "Post actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /posts/:id
const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Post eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost
};
