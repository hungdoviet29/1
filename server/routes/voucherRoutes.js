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
// router.post('/vouchers', createVoucher);
// Ví dụ với Express.js
app.post('/vouchers', (req, res) => {
    const { title, description, expirationDate, isActive } = req.body;

    if (!title || !description || !expirationDate) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Tiến hành lưu dữ liệu
    // Giả sử đây là một đoạn lưu vào cơ sở dữ liệu
    Voucher.create({ title, description, expirationDate, isActive })
        .then(voucher => res.status(201).json(voucher))
        .catch(error => res.status(500).json({ error: error.message }));
});


// Route lấy danh sách tất cả voucher
router.get('/vouchers', getVouchers);

// Route lấy chi tiết voucher theo ID
router.get('/vouchers/:id', getVoucherById);

// Route cập nhật voucher theo ID
router.put('/vouchers/:id', updateVoucher);

// Route xóa voucher theo ID
router.delete('/vouchers/:id', deleteVoucher);

module.exports = router;
