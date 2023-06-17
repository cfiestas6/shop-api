const express = require('express');
const checkAuth = require('../middleware/auth');
const OrdersController = require('../controllers/orders');
const router = express.Router();

/* Order routes */

router.get('/', checkAuth, OrdersController.getAllOrders);

router.post('/', checkAuth, OrdersController.addOrder);

router.get('/:orderId', checkAuth, OrdersController.getOrder);

router.delete('/:orderId', checkAuth, OrdersController.deleteOrder);

module.exports = router;
