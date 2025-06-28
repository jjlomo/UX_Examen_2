const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middleware/auth');

// router.use(verifyToken); // protege todas las rutas

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
