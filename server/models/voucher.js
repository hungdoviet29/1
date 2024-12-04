const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  type: {type: String, required: true}, // Loại voucher
  title: {type: String, required: true}, // Tiêu đề voucher
  description: {type: String, required: true}, // Mô tả voucher
  expirationDate: {type: String, required: true}, // Ngày hết hạn (String hoặc Date)
  isActive: {type: Boolean, default: true}, // Trạng thái voucher
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
