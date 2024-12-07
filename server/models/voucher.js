const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  type: {type: String, required: true}, // Loại voucher
  title: {type: String, required: true}, // Tiêu đề voucher
  description: {type: String, required: true}, // Mô tả voucher
  startDate: {type: Date, required: true}, // Ngày bắt đầu
  expirationDate: {type: Date, required: true}, // Ngày hết hạn
  isActive: {type: Boolean, default: true}, // Trạng thái voucher
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, // ID người dùng
  quantity: {type: Number, required: true}, // Số lượng
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
