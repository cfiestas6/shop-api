const mongoose = require('mongoose');

/* This code is defining a Mongoose schema for an order. The schema has three fields: `_id`, which is a
unique identifier for the order; `product`, which is a reference to a `Product` object and is
required; and `quantity`, which is a number field with a default value of 1. This schema can be used
to create and manipulate order objects in a MongoDB database using Mongoose. */

const orderSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
	quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Order', orderSchema);
