const express = require('express');
const { 
	getPosts, 
	createPost, 
	postsByUser, 
	postById, 
	isPost, 
	deletePost, 
	updatePost,
	singlePost,
	photo,
	like,
	unlike 
} = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { createPostValidator } = require("../validator/index");
const { userById } =  require('../controllers/user');
const router = express.Router();

router.get("/posts", getPosts);

//unlike like
router.put("/post/like", requireSignin, like);
router.put('/post/unlike', requireSignin, unlike);

//post routes
router.post("/post/new/:userId", requireSignin, createPost, createPostValidator);
router.get("/posts/by/:userId", requireSignin, postsByUser);
router.get("/post/:postId", singlePost);

router.delete("/post/:postId", requireSignin, isPost, deletePost);
router.put("/post/:postId", requireSignin, isPost, updatePost);


//photo
router.get("/post/photo/:postId", photo);


//any route containing :userId, our app will first execute userByID()
router.param("userId", userById);
//any route containing :postId, our app will first execute userByID()
router.param("postId", postById);

module.exports = router;

