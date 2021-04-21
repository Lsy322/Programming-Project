var express = require('express');

var postController = require('../controllers/posts.js')

const router = express.Router();

router.get('/list', postController.getPosts);
router.post('/list/user', postController.getPostsById);
router.post('/prefer', postController.getPreferPost)
router.patch('/:id', postController.updatePost);
router.put('/', postController.createPost);
router.delete('/:id/delete', postController.deletePost);
router.put('/repost', postController.createRepost)

module.exports = router;