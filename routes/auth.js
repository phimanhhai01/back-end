const express = require("express");
const { signup, signin,  signout } = require("../controllers/auth.js");
const { userSignupValidator } = require("../validator/index");
const { userById } = require("../controllers/user");
//const validator = require("../validator/index");
const router = express.Router();

router.post("/signup", userSignupValidator,  signup);
router.post("/signin", signin);
router.get("/signout", signout);

//any route containing our userId, our app will execute userById() first.
router.param("userId", userById);

module.exports = router;

