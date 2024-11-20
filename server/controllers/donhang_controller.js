const DonHang = require('../models/donhangs_model');

// Tạo đơn hàng mới
const createDonHang = async (req, res) => {
    try {
        const { userId, cartItems, totalAmount, paymentMethod, shippingInfo } = req.body;

        if (!userId || !cartItems || !totalAmount || !paymentMethod || !shippingInfo) {
            return res.status(400).json({ message: 'Thiếu thông tin cần thiết để tạo đơn hàng' });
        }

        const newDonHang = new DonHang({
            userId,
            cartItems,
            totalAmount,
            paymentMethod,
            shippingInfo,
            status: 'Chờ xác nhận', // Trạng thái mặc định
        });

        await newDonHang.save();
        res.status(201).json({ success: true, message: 'Đơn hàng đã được tạo thành công!', data: newDonHang });
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại sau.' });
    }
};

// Lấy tất cả đơn hàng của một người dùng
const getDonHangsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const donHangs = await DonHang.find({ userId }).populate({
            path: 'cartItems.productId',
            select: 'ten gia hinhAnh',
        });

        if (!donHangs || donHangs.length === 0) {
            return res.status(404).json({ message: 'Không có đơn hàng nào cho người dùng này.' });
        }

        res.status(200).json(donHangs);
    } catch (error) {
        console.error('Lỗi khi lấy đơn hàng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy đơn hàng. Vui lòng thử lại sau.' });
    }
};

// Lấy tất cả đơn hàng
const getAllDonHangs = async (req, res) => {
    try {
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

// Cập nhật đơn hàng (hủy, xác nhận, thay đổi trạng thái)
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

// Lấy đơn hàng theo trạng thái và userId
const getDonHangsByUserAndStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { status } = req.query;

        const query = { userId };
        if (status) query.status = status;

        const donHangs = await DonHang.find(query).populate({
            path: 'cartItems.productId',
            select: 'ten gia hinhAnh',
        });

        if (!donHangs || donHangs.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng nào phù hợp.' });
        }

        res.status(200).json(donHangs);
    } catch (error) {
        console.error('Lỗi khi lấy đơn hàng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' });
    }
};

// Xóa đơn hàng
const deleteDonHang = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDonHang = await DonHang.findByIdAndDelete(id);

        if (!deletedDonHang) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng với ID này.' });
        }

        res.status(200).json({ success: true, message: 'Đơn hàng đã được xóa.', data: deletedDonHang });
    } catch (error) {
        console.error('Lỗi khi xóa đơn hàng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa đơn hàng. Vui lòng thử lại sau.' });
    }
};

// Xuất khẩu tất cả các hàm
module.exports = {
    createDonHang,
    getDonHangsByUser,
    getAllDonHangs,
    updateDonHang,
    getDonHangsByUserAndStatus,
    deleteDonHang,
};
