const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/auth');
const AuthController = require('../controllers/auth');

/* Auth routes */

router.post('/signup', AuthController.signUp);

router.post('/login', AuthController.logIn);

router.delete('/:userId', checkAuth, AuthController.deleteAccount);

module.exports = router;
