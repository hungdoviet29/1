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
            status: 'Chờ xác nhận',  // Trạng thái mặc định
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

// Lấy tất cả đơn hàng của một người dùng
const getDonHangsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Tìm tất cả đơn hàng của người dùng và populate thông tin sản phẩm
        const donHangs = await DonHang.find({ userId })
            .populate({
                path: 'cartItems.productId', // Liên kết với `LapStore`
                select: 'ten gia hinhAnh', // Chỉ lấy các trường cần thiết
            });

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

// Lấy tất cả đơn hàng của tất cả người dùng
const getAllDonHangs = async (req, res) => {
    try {
        // Lấy tất cả đơn hàng mà không populate để kiểm tra
        const donHangs = await DonHang.find().populate({
            path: 'cartItems.productId',
            select: 'ten gia hinhAnh',
        });

        if (!donHangs || donHangs.length === 0) {
            return res.status(404).json({ message: 'Không có đơn hàng nào.' });
        }

        res.status(200).json(donHangs);
    } catch (error) {
        console.error('Lỗi khi lấy tất cả đơn hàng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy tất cả đơn hàng. Vui lòng thử lại sau.' });
    }
};


// Export tất cả các hàm cùng một lần
module.exports = {
    createDonHang,
    getDonHangsByUser,
    getAllDonHangs,
};


// Sửa đơn hàng
const updateDonHang = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedDonHang = await DonHang.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedDonHang) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng với ID này.' });
        }

        res.status(200).json({ success: true, message: 'Đơn hàng đã được cập nhật.', data: updatedDonHang });
    } catch (error) {
        console.error('Lỗi khi cập nhật đơn hàng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật đơn hàng. Vui lòng thử lại sau.' });
    }
};

module.exports = {
    ...require('./donhang_controller'),
    updateDonHang,
};


const getDonHangsByUserAndStatus = async (req, res) => {
    try {
        const { userId } = req.params; // Lấy userId từ route params
        const { status } = req.query; // Lấy trạng thái từ query parameter

        // Điều kiện tìm kiếm
        const query = { userId };
        if (status) {
            query.status = status; // Thêm điều kiện lọc trạng thái nếu có
        }

        // Tìm tất cả đơn hàng của người dùng và populate thông tin sản phẩm
        const donHangs = await DonHang.find(query).populate({
            path: 'cartItems.productId', // Liên kết với `LapStore`
            select: 'ten gia hinhAnh', // Chỉ lấy các trường cần thiết
        });

        if (!donHangs || donHangs.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng nào phù hợp.' });
        }

        // Trả về danh sách đơn hàng
        res.status(200).json(donHangs);
    } catch (error) {
        console.error('Lỗi khi lấy đơn hàng theo trạng thái và người dùng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' });
    }
};

module.exports = {
    ...require('./donhang_controller'),
    getDonHangsByUserAndStatus,
};
