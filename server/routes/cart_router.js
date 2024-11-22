const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart_controller');

router.get('/:userId', CartController.getCart);
router.post('/add', CartController.addToCart);
router.delete('/remove', CartController.removeFromCart);
router.put('/update', CartController.updateCartItem);

router.delete('/:userId', CartController.clearCart);  // Xóa giỏ hàng theo userId




module.exports = router;
