var express = require('express');

var postController = require('../controllers/posts.js')

const router = express.Router();

router.get('/list', postController.getPosts);
router.post('/create', postController.createPost);
router.delete('/delete/:id', postController.deletePost);

module.exports = router;