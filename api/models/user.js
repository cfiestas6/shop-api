const mongoose = require('mongoose');

/* This code is defining a Mongoose schema for a user object. The schema includes three fields: `_id`,
`email`, and `password`. `_id` is a unique identifier for the user, `email` is a required string
field that must match a regular expression pattern for a valid email address, and `password` is a
required string field. The schema is then exported as a Mongoose model named `User`. */

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: { 
		type: String, 
		required: true, 
		unique: true, 
		match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	},
	password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
