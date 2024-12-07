const express = require('express');
const {
  getAllVouchers,
  createVoucherByUser,
  getVouchersByUser,
  getVoucherByIdAndUser,
  updateVoucherByUser,
  deleteVoucherByUser,
  useVoucher, // Thêm vào controller sử dụng voucher
} = require('../controllers/voucherController');

const router = express.Router();
// Route lấy tất cả danh sách voucher
router.get('/all', getAllVouchers); // Thêm route mới để lấy tất cả voucher

// Route tạo voucher mới (theo userId)
router.post('/', createVoucherByUser); // Đảm bảo route đúng là "/"

// Route lấy danh sách voucher theo userId
router.get('/', getVouchersByUser);

// Route lấy chi tiết voucher theo ID và userId
router.get('/:id', getVoucherByIdAndUser);

// Route cập nhật voucher theo ID và userId
router.put('/:id', updateVoucherByUser);

// Route xóa voucher theo ID và userId
router.delete('/:id', deleteVoucherByUser);

// Route sử dụng voucher (giảm số lượng khi voucher được sử dụng)
router.post('/use', useVoucher); // Thêm route sử dụng voucher

module.exports = router;
