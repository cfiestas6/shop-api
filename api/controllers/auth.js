const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

/* `exports.signUp` is exporting a function that handles the logic for user sign up. 

It takes in three parameters: `req` (request), `res` (response), and `next` (next middleware function). 

The function first checks if the email provided by the user already exists in the database. If it does, it
returns a 409 (conflict) status code with a message indicating that the email is already in use.

If the email is not in use, the function hashes the user's password using bcrypt and saves the user's
email and hashed password to the database. 

If there is an error during the process, the function 
returns a 500 (internal server error) status code with an error message. */

exports.signUp = (req, res, next) => {
	User.find({ email: req.body.email })
	.exec()
	.then(user => {
		if (user.length > 0) {
			return res.status(409).json({
				message: 'Email already used by other user.'
			});
		} else {

			bcrypt.hash(req.body.password, 10, (error, hash) => {
				if (error) {
					return res.status(500).json({
						error: error
					})
				} else {
					const user = new User({
						_id: new mongoose.Types.ObjectId(),
						email: req.body.email,
						password: hash
					});
					user
					.save()
					.then(result => {
						console.log(result);
						res.status(201).json({
							message: 'User created successfully!'
						})
					})
					.catch (error => {
						console.error(error);
						res.status(500).json({ error: error })
					})
				}
			})
		}
	})
	.catch()
}

/* `exports.logIn` is exporting a function that handles the logic for user login. It takes in three
parameters: `req` (request), `res` (response), and `next` (next middleware function). */
exports.logIn = (req, res, next) => {
	User.find({ email: req.body.email })
	.exec()
	.then(user => {
		if (user.length < 1) {
			return res.status(401).json({
				message: 'Auth failed.'
			});
		}
		bcrypt.compare(req.body.password, user[0].password, (error, result) => {
			if (error || !result) {
				return res.status(401).json({
					message: 'Auth failed.'
				});
			}
			if (result) {
				const token = jwt.sign({
					email: user[0].email,
					userId: user[0]._id
				}, 
				process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
				return res.status(200).json({
					message: 'Auth successfull!',
					token: token
				});
			}
		});
	})
	.catch(error => {
		console.error(error);
		res.status(500).json({ error: error })
	})
}

/* `exports.deleteAccount` is exporting a function that handles the logic for deleting a user account.
It takes in three parameters: `req` (request), `res` (response), and `next` (next middleware
function). The function first extracts the user ID from the request parameters, then uses Mongoose's
`findByIdAndRemove` method to find and remove the user from the database.

If the operation is successful, the function returns a 200 (OK) status code with a message indicating that the user was
deleted successfully. If there is an error during the process, the function returns a 500 (internal
server error) status code with an error message. */

exports.deleteAccount = (req, res, next) => {
	const id = req.params.userId;

	User.findByIdAndRemove(id)
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'User deleted successfully!'
		});
	})
	.catch(error => {
		res.status(500).json({ error: error })
	})
}