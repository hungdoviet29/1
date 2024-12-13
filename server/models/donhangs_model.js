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
    status: { 
        type: String, 
        default: 'Chờ xác nhận',  // Trạng thái mặc định
        enum: ['Chờ xác nhận', 'Đã xác nhận', 'Đang vận chuyển', 'Đã giao', 'Hủy']  // Các trạng thái có thể có
    },
    cancelReason: { type: String }, // Thêm lý do hủy
}, { timestamps: true });

// Export mô hình DonHang
module.exports = mongoose.model('DonHang', donhangSchema);
