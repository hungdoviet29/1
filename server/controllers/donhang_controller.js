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

        const donHangs = await DonHang.find({ userId }).populate({
            path: 'cartItems.productId',
            select: 'ten gia hinhAnh',
        });

        if (!donHangs.length) {
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

        if (!donHangs.length) {
            return res.status(404).json({ message: 'Không có đơn hàng nào.' });
        }

        res.status(200).json(donHangs);
    } catch (error) {
        console.error('Lỗi khi lấy tất cả đơn hàng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy tất cả đơn hàng. Vui lòng thử lại sau.' });
    }
};

// Sửa đơn hàng
const updateDonHang = async (req, res) => {
    try {
        const { id } = req.params; // Lấy orderId từ URL
        const updatedData = req.body; // Dữ liệu cần cập nhật

        // Cập nhật đơn hàng
        const updatedDonHang = await DonHang.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedDonHang) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng với ID này.' });
        }

        // Trả về phản hồi sau khi cập nhật
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
        if (status) query.status = status; // Thêm điều kiện status nếu có

        // Tìm đơn hàng theo điều kiện
        const donHangs = await DonHang.find(query).populate({
            path: 'cartItems.productId',
            select: 'ten gia hinhAnh',
        });

        // Nếu không tìm thấy đơn hàng, trả về danh sách rỗng
        if (!donHangs.length) {
            return res.status(200).json([]);
        }

        // Trả về danh sách đơn hàng
        res.status(200).json(donHangs);
    } catch (error) {
        console.error('Lỗi khi lấy đơn hàng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' });
    }
};
// Lấy đơn hàng theo ID
const getDonHangById = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID đơn hàng từ URL

        // Kiểm tra xem ID có hợp lệ hay không
        if (!id || id.trim() === "") {
            return res.status(400).json({ message: 'ID đơn hàng không hợp lệ.' });
        }

        // Tìm đơn hàng theo ID và populate để lấy thông tin sản phẩm
        const donHang = await DonHang.findById(id).populate({
            path: 'cartItems.productId',
            select: 'ten gia hinhAnh',
        });

        // Nếu không tìm thấy đơn hàng, trả về lỗi 404
        if (!donHang) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng với ID này.' });
        }

        // Trả về thông tin đơn hàng
        res.status(200).json({ success: true, data: donHang });
    } catch (error) {
        console.error('Lỗi khi lấy đơn hàng theo ID:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy đơn hàng. Vui lòng thử lại sau.' });
    }
};
const axios = require('axios');
const crypto = require('crypto');

// Thanh toán qua ZaloPay
const payWithZaloPay = async (req, res) => {
    try {
        const { orderId, totalAmount, shippingInfo, items } = req.body;

        if (!orderId || !totalAmount || !shippingInfo || !items) {
            return res.status(400).json({ message: 'Thiếu thông tin cần thiết.' });
        }

        const config = {
            app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
        };

        const moment = require('moment');
        const appTransId = `${moment().format('YYMMDD')}_${Math.floor(Math.random() * 1000000)}`; // Định dạng mã giao dịch

        const order = {
            app_id: config.app_id,
            app_trans_id: appTransId,
            app_user: shippingInfo.name,
            app_time: Date.now(),
            amount: totalAmount,
            item: JSON.stringify(items),
            embed_data: JSON.stringify({ orderId, shippingInfo }),
            description: `Thanh toán đơn hàng ${orderId}`,
        };

        // Tạo chữ ký (signature)
        const crypto = require('crypto');
        const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
        order.mac = crypto.createHmac('sha256', config.key1).update(data).digest('hex');

        // Gửi yêu cầu đến ZaloPay
        const axios = require('axios');
        const response = await axios.post(config.endpoint, order);

        if (response.data.return_code === 1) {
            res.status(200).json({ success: true, payment_url: response.data.order_url });
        } else {
            res.status(400).json({ message: response.data.return_message, detail: response.data });
        }
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu thanh toán ZaloPay:', error);
        res.status(500).json({ message: 'Lỗi server.', detail: error.message });
    }
};


// Xuất khẩu tất cả hàm
module.exports = {
    createDonHang,
    getDonHangsByUser,
    getAllDonHangs,
    updateDonHang,
    getDonHangsByUserAndStatus,
    getDonHangById,
    payWithZaloPay,
};
