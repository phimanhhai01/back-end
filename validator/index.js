exports.createPostValidator = (req, res, next) => {
	//title
	req.check("title", "Write a title").notEmpty();
	req.check("title", "The number of charactors is required to be between 4 and 150").isLength({
		min: 4,
		max: 150
	});
	//body
	req.check("body", "Write a body").notEmpty();
	req.check("body", "The number of charactors is required to be between 4 and 2000").isLength({
		min: 4,
		max: 2000
	});  
	//check for the errors
	const errors = req.validationErrors();
	// if error show the first error
	if(errors){
		const firstError = errors.map(error => error.msg)[0];
		return res.status(400).json({error: firstError});
	}
	//proceed to next middleware
	next();
}

exports.userSignupValidator = (req, res, next) => {
	//name is not null and between 4 to 10 charactor
	req.check("name", "Name is required").notEmpty();
	//email is not null, valid and normalized
	req.check("email", "Email is must be between 3 and 32 charactors")
	.matches(/.+\@.+\..+/)
	.withMessage("Email must contain @")
	.isLength({
		min: 4,
		max: 2000
	});
	//check for password
	req.check("password", "Password is required").notEmpty();
	req.check("password").
	isLength({min: 6})
	.withMessage("Password must contain at least 6 charactors")
	.matches(/\d/)
	.withMessage("Password must contain a number");//check for errors
	const errors = req.validationErrors();

	if(errors){
		const firstError = errors.map(error => error.msg)[0];
		return res.status(400).json({ error: firstError });
	}
	next();
}
