const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/auth');
const ProductsController = require('../controllers/products');

/* Product routes */

router.get('/', ProductsController.getAllProducts);

router.post('/', checkAuth, ProductsController.addProduct);

router.get('/:productId', ProductsController.getProduct);

router.patch('/:productId', checkAuth, ProductsController.updateProduct);

router.delete('/:productId', checkAuth, ProductsController.deleteProduct);

module.exports = router;
