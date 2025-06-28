const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// No protegidas, pero puedes usar middleware como verifyToken si quieres
 //router.use(verifyToken); // protege todas las rutas
router.get("/listPost", postController.getAllPosts);
router.post("/createPost", postController.createPost);
router.put("/editPost/:id", postController.updatePost);
router.delete("/deletePost/:id", postController.deletePost);

module.exports = router;
