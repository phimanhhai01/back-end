const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require('express-jwt');
const User = require('../models/user.js');

exports.signup = async (req, res) => {
	const userExists = await User.findOne({email: req.body.email});
	if(userExists){
		return res.status(403).json({
			error: "This email was taken!"
		});
	};
	const user = await new User(req.body);
	await user.save();
	res.status(200).json({ message: "A new user has been created." });
};

exports.signin = (req, res) => {
	//find the user based on email
	const { email, password } = req.body;

	User.findOne({email}, (err, user) => {
		// if err or no user
		if(err || !user){
			return res.status(401).json({
				error: "User with that email does not exist. Please signin."
			})
		}
		//if user is found, make sure the email and the password matched
		// create authenticate method in model and use here
		if(!user.authenticate(password)){
			return res.status(401).json({
				error: "Email and password doesn/'t match"
			})
		}
		//generate a token with user id and secret
		const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
		//persist the token as 't' in cookie with expiry date
		res.cookie("t", token, { expire: new Date()  + 9999 });
		//return response with user and token to front-end client
		const { _id, name, email } = user;
		return res.json({ token, user: {_id, email, name}});
	});
};

exports.signout = (req, res) => {
	res.clearCookie("t");
	return res.json({message: "Signout success"});
};

exports.requireSignin = expressJwt({ secret:  process.env.JWT_SECRET, algorithms: ['HS256'], userProperty: "auth" }); ///////////////// ?????????