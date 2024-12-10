const express = require('express');
const router = express.Router();
const { loginHandler, signupHandler, addToCart, removeFromCart, getAllUsers, getCartItems, getAllItems } = require('../controller/user');
const authMiddleware = require('../helper/authmiddleware');

router.post('/login', loginHandler);
router.post('/signup', signupHandler);
router.post('/add-to-cart', authMiddleware, addToCart);
router.post('/remove-from-cart', authMiddleware, removeFromCart);
router.get('/getItem', authMiddleware, getCartItems);
router.get('/allUsers', getAllUsers);
router.get('/allItems', getAllItems);

module.exports = router;
