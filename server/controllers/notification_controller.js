const Notification = require('../models/notification_model');
const DonHang = require('../models/donhangs_model'); // Đường dẫn phải chính xác tới model DonHang

// Lấy thông báo theo userId
const getNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

        const enhancedNotifications = await Promise.all(
            notifications.map(async (notification) => {
                if (notification.message.includes('Đã được hủy') && notification.orderId) {
                    const donHang = await DonHang.findById(notification.orderId);
                    if (donHang && donHang.cancelReason) {
                        return {
                            ...notification.toObject(),
                            reason: donHang.cancelReason,
                        };
                    }
                }
                return notification.toObject();
            })
        );

        res.status(200).json({ success: true, data: enhancedNotifications });
    } catch (error) {
        console.error('Lỗi khi lấy thông báo:', error);
        res.status(500).json({ success: false, message: 'Không thể lấy thông báo.' });
    }
};



module.exports = { getNotifications };
