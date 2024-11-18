// routes/donhangRouter.js
const express = require('express');
const router = express.Router();
const donhangController = require('../controllers/donhang_controller');

// Route để tạo đơn hàng
router.post('/', donhangController.createDonHang);


// Route để lấy tất cả đơn hàng của một người dùng
router.get('/user/:userId', donhangController.getDonHangsByUser);

module.exports = router;
