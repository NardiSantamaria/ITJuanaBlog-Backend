const {Router} = require('express');
const { route } = require('express/lib/application');

const {getPost, getPosts, createPost, updatePost, deletePost, createComment, deleteComment, updateComment} = require('../controller/posts');

const router = Router();

router.get('/post/:id', getPost);
router.get('/posts', getPosts);
router.post('/create-post', createPost);
router.put('/create-comment/:id', createComment);
router.put('/update-post/:id', updatePost);
router.delete('/delete-post/:id', deletePost);
router.put('/delete-comment/:id/:post', deleteComment);
router.put('/update-comment/:id/:post', updateComment);

module.exports = router