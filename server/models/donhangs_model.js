// models/donhang.js
const mongoose = require('mongoose');

// Định nghĩa schema cho đơn hàng
const donhangSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cartItems: [{ 
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'LapStore', required: true },
        quantity: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    shippingInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
    },
    status: { type: String, default: 'Chờ vận chuyển' }, // Trạng thái mặc định
}, { timestamps: true });

// Export mô hình DonHang
module.exports = mongoose.model('DonHang', donhangSchema);
