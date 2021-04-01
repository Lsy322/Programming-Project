var express = require('express');

var postController = require('../controllers/posts.js')

const router = express.Router();

router.get('/list', postController.getPosts);

router.put('/', postController.createPost);
router.delete('/:id/delete', postController.deletePost);

module.exports = router;