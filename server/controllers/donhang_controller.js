const DonHang = require('../models/donhangs_model');
const Notification = require('../models/notification_model'); // Đảm bảo bạn có mô hình Notification
const { laptopModel } = require('../models/laptop_model'); // Import model laptop

const axios = require('axios');
const crypto = require('crypto');
const moment = require('moment');

const createDonHang = async (req, res) => {
    try {
        const { userId, cartItems, totalAmount, paymentMethod, shippingInfo } = req.body;

        if (!userId || !cartItems || !totalAmount || !paymentMethod || !shippingInfo) {
            return res.status(400).json({ message: 'Thiếu thông tin cần thiết để tạo đơn hàng' });
        }

        // Check stock availability and subtract quantities
        for (const item of cartItems) {
            const product = await laptopModel.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Sản phẩm không tồn tại với ID ${item.productId}` });
            }
            if (product.soLuong < item.quantity) {
                return res.status(400).json({ message: `Sản phẩm ${product.ten} không đủ số lượng trong kho` });
            }
            product.soLuong -= item.quantity;
            await product.save();
        }

        // Tạo đơn hàng mới
        const newDonHang = new DonHang({
            userId,
            cartItems,
            totalAmount,
            paymentMethod,
            shippingInfo,
            status: 'Chờ xác nhận', // Trạng thái mặc định
        });

        await newDonHang.save();

        // Tạo thông báo cho người dùng
        const notification = new Notification({
            userId,
            message: `Đơn hàng của bạn đã được tạo thành công với mã đơn hàng ${newDonHang._id}.`,
            createdAt: new Date(),
        });

        await notification.save();

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
        const { id } = req.params;
        let { status, reason } = req.body;

        // Chuyển trạng thái sang chữ thường để không phân biệt chữ hoa/thường
        status = status.toLowerCase();

        const updatedData = { status };
        if (status === 'đã được hủy' && reason) {
            updatedData.cancelReason = reason;
        }

        const updatedDonHang = await DonHang.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedDonHang) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng với ID này.' });
        }

        // Nếu trạng thái là "đã được hủy", cập nhật lại số lượng sản phẩm
        if (status === 'đã được hủy') {
            for (const item of updatedDonHang.cartItems) {
                const product = await laptopModel.findById(item.productId);
                if (!product) {
                    console.error(`Không tìm thấy sản phẩm với ID ${item.productId}`);
                    continue;
                }
                product.soLuong += item.quantity; // Hoàn trả lại số lượng vào kho
                await product.save();
            }
        }

        // Tạo thông báo cho người dùng
        const notificationMessage = status === 'đã được hủy' && reason
            ? `Đơn hàng ${id} của bạn Đã được hủy.`
            : `Trạng thái đơn hàng ${id} của bạn đã thay đổi thành ${req.body.status}.`;

        const notification = new Notification({
            userId: updatedDonHang.userId,
            orderId: id,
            message: notificationMessage,
            createdAt: new Date(),
        });

        await notification.save();

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


// Thanh toán qua ZaloPay
const payWithZaloPay = async (req, res) => {
    try {
        const { amount, items, embed_data } = req.body;
console.log(req.body.amount);
console.log(req.body.items);
console.log(req.body.embed_data);

        // Kiểm tra dữ liệu
        if (!amount || !items || !embed_data || !embed_data.orderId || !embed_data.shippingInfo) {
            return res.status(400).json({ message: 'Thiếu thông tin cần thiết.' });
        }

        const { orderId, shippingInfo } = embed_data;

        console.log("orderId:", orderId, "amount:", amount, "shippingInfo:", shippingInfo, "item:", items);

        const config = {
            app_id: 2553,
            key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
            key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
            endpoint: "https://sb-openapi.zalopay.vn/v2/create"
        };

        const appTransId = `${moment().format('YYMMDD')}_${Math.floor(Math.random() * 1000000)}`; // Định dạng mã giao dịch

        const order = {
            app_id: config.app_id,
            app_user: shippingInfo.name,
            app_trans_id: appTransId,
            app_time: Date.now(),
            amount: amount,
            item: JSON.stringify(items),
            description: `Thanh toán đơn hàng ${orderId}`,
            embed_data: JSON.stringify(embed_data),
        };

        // Tạo chữ ký (signature)
        const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
        order.mac = crypto.createHmac('sha256', config.key1).update(data).digest('hex');

        console.log('Dữ liệu gửi đến ZaloPay:', order);
        console.log('Data:', data);
        console.log('MAC:', order.mac);


        // Gửi yêu cầu đến ZaloPay
        const response = await axios.post(config.endpoint, order);

        console.log(response.data);

        if (response.data.return_code === 1) {
            res.status(200).json({ success: true, payment_url: response.data.order_url,zp_trans_token:response.data.zp_trans_token });
        } else {
            res.status(400).json({ message: response.data.return_message, detail: response.data });
            console.log(response.data);
        }
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu thanh toán ZaloPay:', error);
        res.status(500).json({ message: 'Lỗi server.', detail: error.message });
    }
};


const getNotifications = async (req, res) => {
    try {
        const { userId } = req.params; // Lấy userId từ URL
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }); // Lấy thông báo mới nhất
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        console.error('Lỗi khi lấy thông báo:', error);
        res.status(500).json({ success: false, message: 'Không thể lấy thông báo.' });
    }
};

module.exports = { getNotifications };


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
