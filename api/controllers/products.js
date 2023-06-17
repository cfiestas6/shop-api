const mongoose = require('mongoose');

const Product = require('../models/product');

/* `exports.getAllProducts` is defining a function that will handle a GET request to retrieve all
products from the database. 

The function takes in three parameters: `req` (the request object),
`res` (the response object), and `next` (a function to call the next middleware function in the
stack). 

The function uses Mongoose to find all products in the database, selects only the `name`,
`price`, and `_id` fields, and returns them in a JSON response with a count of the number of
products and a request object for each product that includes the HTTP method and endpoint to
retrieve that product. If there is an error, the function logs the error and returns a 500 status
code with an error message in JSON format. */

exports.getAllProducts = (req, res, next) => {
	Product.find()
	.select('name price _id')
	.exec()
	.then(docs => {
		const data = {
			count: docs.length,
			products: docs.map(doc => {
				return {
					_id: doc._id,
					name: doc.name,
					price: doc.price,
					request: {
						method: 'GET',
						endpoint: 'http://localhost:3000/products' + doc._id
					}
				}
			})
		}
		console.log(data);
		res.status(200).json(data);
	})
	.catch(error => {
		console.error(error);
		res.status(500).json({ error: error });
	});
}

/* `exports.addProduct` is defining a function that will handle a POST request to add a new product to
the database. The function takes in three parameters: `req` (the request object), `res` (the
response object), and `next` (a function to call the next middleware function in the stack). */

exports.addProduct = (req, res, next) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price
	});
	product
	.save()
	.then(result => {
		console.log(result);
		res.status(201).json({
			message: 'Product created successfully!',
			product: {
				_id: result._id,
				name:  result.name,
				price: result.price,
				request: {
					method: 'GET',
					endpoint: 'http://localhost:3000/products/' + result._id
				}
			}
		});
	})
	.catch (error => {
		console.error(error);
		res.status(500).json({ error: error });
	});
}

/* `exports.getProduct` is defining a function that will handle a GET request to retrieve a single
product from the database. The function takes in three parameters: `req` (the request object), `res`
(the response object), and `next` (a function to call the next middleware function in the stack). */

exports.getProduct = (req, res, next) => {
	const id = req.params.productId;

	Product.findById(id)
	.select('name price _id')
	.exec()
	.then(doc => {
		console.log(doc);
		if (doc) {
			res.status(200).json(doc);
		} else {
			res.status(404).json({
				message: "Product not found."
			});
		}
	})
	.catch(error => {
		console.log(error);
		res.status(500).json({ error: error });
	})
}

/* `exports.updateProduct` is defining a function that will handle a PUT request to update a product in
the database. The function takes in three parameters: `req` (the request object), `res` (the
response object), and `next` (a function to call the next middleware function in the stack). */

exports.updateProduct = (req, res, next) => {
	const id = req.params.productId;
	const updateOps = {}
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}

	Product.findByIdAndUpdate(id, { $set: updateOps })
	.exec()
	.then(result => {
		console.log(result);
		res.status(200).json({
			message: "Product successfully created!",
			request: {
				method: "GET",
				endpoint: "http://localhost:3000/products/" + id
			}
		});
	})
	.catch(error => {
		console.error(error);
		res.status(500).json({
			error: error
		});
	});
}

/* `exports.deleteProduct` is defining a function that will handle a DELETE request to remove a product
from the database. 

The function takes in three parameters: `req` (the request object), `res` (the
response object), and `next` (a function to call the next middleware function in the stack). 

It finds the product by ID using Mongoose and removes it from the database. If successful, it returns a
JSON response with a message indicating the product was deleted and a request object for creating a
new product. If there is an error, it logs the error and returns a 500 status code with an error
message in JSON format. */

exports.deleteProduct = (req, res, next) => {
	const id = req.params.productId;
	Product.findByIdAndRemove(id)
	.exec()
	.then(result => {
		res.status(200).json({
			message: "Product deleted successfully!",
			request: {
				method: 'POST',
				endpoint: 'http://localhost:3000/products/',
				body: {
					name: 'String',
					price: 'Number'
				}
			}
		});
	})
	.catch(error => {
		console.error(error);
		res.status(500).json({error: error});
	});
}