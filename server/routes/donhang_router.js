// routes/donhangRouter.js
const express = require('express');
const router = express.Router();
const donhangController = require('../controllers/donhang_controller'); // Kiểm tra đúng đường dẫn

// Route để tạo đơn hàng
router.post('/', donhangController.createDonHang);

// Route để lấy tất cả đơn hàng của một người dùng
router.get('/user/:userId', donhangController.getDonHangsByUser);

// Route để lấy tất cả đơn hàng
router.get('/', donhangController.getAllDonHangs);

router.get('/user/:userId/status', donhangController.getDonHangsByUserAndStatus);

module.exports = router;
