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

// Route để cập nhật đơn hàng
router.put('/:id', donhangController.updateDonHang);

// Route để lấy đơn hàng theo trạng thái và userId
router.get('/user/:userId/status', donhangController.getDonHangsByUserAndStatus);

module.exports = router;
