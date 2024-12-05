const express = require('express');
const {
  createVoucher,
  getVouchers,
  getVoucherById,
  updateVoucher,
  deleteVoucher,
} = require('../controllers/voucherController');

const router = express.Router();

// Route tạo voucher mới
router.post('/vouchers', createVoucher);

// Route lấy danh sách tất cả voucher
router.get('/vouchers', getVouchers);

// Route lấy chi tiết voucher theo ID
router.get('/vouchers/:id', getVoucherById);

// Route cập nhật voucher theo ID
router.put('/vouchers/:id', updateVoucher);

// Route xóa voucher theo ID
router.delete('/vouchers/:id', deleteVoucher);

module.exports = router;
