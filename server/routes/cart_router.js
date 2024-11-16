const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart_controller');

router.get('/:userId', CartController.getCart);
router.post('/add', CartController.addToCart);
router.delete('/remove', CartController.removeFromCart);
router.put('/update', CartController.updateCartItem);
module.exports = router;
