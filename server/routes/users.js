const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Routes cho người dùng
router.get('/users', authController.getAllUsers);
router.get('/users/:id', authController.getUserById);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/update/:id', authController.updateUser);
router.post('/change-password', authController.changePassword);
router.post('/forgot-password', authController.forgotPassword);
router.delete('/delete/:id', authController.deleteUser);

// Routes cho yêu thích sản phẩm
router.get('/favorites/:userId', authController.getFavoriteProducts);
router.post('/favorites', authController.addFavoriteProduct);
router.post('/removeFavoriteProduct', authController.removeFavoriteProduct);
router.post('/addFavoriteProduct', authController.addFavoriteProduct);


module.exports = router;
