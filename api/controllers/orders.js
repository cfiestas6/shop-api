const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

/* `exports.getAllOrders` is defining a function that will handle a GET request to retrieve all orders.

The function takes in three parameters: `req` (the request object), `res` (the response object), and
`next` (a function to call the next middleware function in the stack). 

The function uses Mongoose to find all orders in the database, selects only the `_id`, `product`, and `quantity` fields, populates
the `product` field with the `name`, `_id`, and `price` fields from the `Product` model, and returns
a JSON response with the count of orders and an array of order objects. 

Each order object includes
the `_id`, `productId`, `quantity`, and a `request` object with information about how to retrieve
the order. */
exports.getAllOrders = (req, res, next) => {
	Order.find()
	.select('_id product quantity')
	.populate('product', 'name _id price')
	.exec()
	.then(docs => { 
		const data = {
			count: docs.length,
			orders: docs.map(doc => {
				return {
					_id: doc._id,
					productId: doc.product,
					quantity: doc.quantity,
					request: {
						method: 'GET',
						endpoint: 'http://localhost:3000/orders/' + doc._id
					}
				}
			})
		}
		console.log(data);
		res.status(200).json(data);
	})
	.catch(error => {
		console.error(error);
		res.status(500).json({ error: error })
	});
}

/* `exports.addOrder` is defining a function that will handle a POST request to add a new order to the
database. The function takes in three parameters: `req` (the request object), `res` (the response
object), and `next` (a function to call the next middleware function in the stack). */

exports.addOrder = (req, res, next) => {
	Product.findById(req.body.productId)
	.then(product => {
		if (!product){
			return res.status(404).json({
				message: 'Product not found.'
			})
		}
		const order = new Order({
			_id: new mongoose.Types.ObjectId(),
			product: req.body.productId,
			quantity: req.body.quantity
		});

		return order.save()
	})
	.then(result => {
		console.log(result);
		res.status(201).json({
			message: 'Order successfully created!',
			order: {
				_id: result._id,
				productId: result.product,
				quantity: result.quantity,
				request: {
					method: 'GET',
					endpoint: 'http://localhost:3000/orders/' + result._id

				}
			}
		});
	})
	.catch (error => {
		console.error(error);
		res.status(500).json({ error: error });
	});
}

/* `exports.getOrder` is defining a function that will handle a GET request to retrieve a specific
order from the database. The function takes in three parameters: `req` (the request object), `res`
(the response object), and `next` (a function to call the next middleware function in the stack). */

exports.getOrder = (req, res, next) => {
	const id = req.params.orderId;

	Order.findById(id)
	.select('_id product quantity')
	.populate('product', '_id price name')
	.exec()
	.then(order => {
		console.log(order);
		if (!order) {
			return res.status(404).json({
				message: 'Order not found.'
			});
		}
		res.status(200).json(order);
	})
	.catch(error => {
		console.error(error);
		res.status(500).json({ error: error })
	})
}

/* `exports.deleteOrder` is defining a function that will handle a DELETE request to remove a specific
order from the database. The function takes in three parameters: `req` (the request object), `res`
(the response object), and `next` (a function to call the next middleware function in the stack). */

exports.deleteOrder = (req, res, next) => {
	const id = req.params.orderId;

	Product.findByIdAndRemove(id)
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Order deleted successfully!',
			request: {
				method: 'POST',
				endpoint: 'http://localhost:3000/orders/',
				body: {
					productId: 'ID',
					quantity: 'Number'
				}
			}
		});
	})
	.catch(error => {
		console.error(error);
		res.status(500).json({ error: error });
	})
}