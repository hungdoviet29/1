// controllers/donhangController.js
const DonHang = require('../models/donhangs_model');

// Tạo đơn hàng mới
const createDonHang = async (req, res) => {
    try {
        const { userId, cartItems, totalAmount, paymentMethod, shippingInfo } = req.body;

        // Kiểm tra xem tất cả các trường cần thiết có tồn tại trong request hay không
        if (!userId || !cartItems || !totalAmount || !paymentMethod || !shippingInfo) {
            return res.status(400).json({ message: 'Thiếu thông tin cần thiết để tạo đơn hàng' });
        }

        // Tạo một đơn hàng mới
        const newDonHang = new DonHang({
            userId,
            cartItems,
            totalAmount,
            paymentMethod,
            shippingInfo,
            status: 'Chờ vận chuyển',  // Trạng thái mặc định
        });

        // Lưu đơn hàng vào cơ sở dữ liệu
        await newDonHang.save();

        // Trả về phản hồi thành công
        res.status(201).json({ success: true, message: 'Đơn hàng đã được tạo thành công!' });
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại sau.' });
    }
};

//Lấy tất cả đơn hàng của một người dùng
const getDonHangsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Tìm tất cả đơn hàng của người dùng
        const donHangs = await DonHang.find({ userId });

        if (!donHangs || donHangs.length === 0) {
            return res.status(404).json({ message: 'Không có đơn hàng nào cho người dùng này.' });
        }

        // Trả về danh sách đơn hàng
        res.status(200).json(donHangs);
    } catch (error) {
        console.error('Lỗi khi lấy đơn hàng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy đơn hàng. Vui lòng thử lại sau.' });
    }
};

  
module.exports = {
    createDonHang,
    getDonHangsByUser,
};
