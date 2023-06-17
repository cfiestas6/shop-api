const jwt = require('jsonwebtoken');

/* This code exports a middleware function that checks for a valid JSON Web Token (JWT) in the
`Authorization` header of an incoming HTTP request.

If a valid token is found, the function decodes it using the `jsonwebtoken` library 
and attaches the decoded user data to the `req` object. 

The function then calls the `next()` function to pass control to the next middleware function in the
chain. If an error occurs during token verification or decoding, the function returns a 401
Unauthorized response with an error message. */

module.exports = (req, res, next) => {

	try {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.userData = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			message: 'Auth failed.'
		});
	}
};
