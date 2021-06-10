const express = require("express");
const { 
	allUsers, 
	getUser, 
	userById, 
	updateUser, 
	deleteUser, 
	userPhoto,
	addFollowing,
	addFollower,
	removeFollowing,
	removeFollower,
	findPeople
} = require("../controllers/user");
//const validator = require("../validator/index");
const { requireSignin } = require("../controllers/auth");
const router = express.Router();


router.put('/user/follow', requireSignin, addFollowing, addFollower);

router.put('/user/unfollow', requireSignin, removeFollowing, removeFollower);

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, updateUser);
router.delete("/user/:userId", requireSignin, deleteUser);
//photo
router.get("/user/photo/:userId", userPhoto);
//find smb to follow
router.get("/user/findpeople/:userId", requireSignin, findPeople);

//any route containing our userId, our app will execute userById() first.
router.param("userId", userById);

module.exports = router;

