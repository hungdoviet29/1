const Notification = require('../models/notification_model');

// Lấy thông báo theo userId
const getNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        console.error('Lỗi khi lấy thông báo:', error);
        res.status(500).json({ success: false, message: 'Không thể lấy thông báo.' });
    }
};

module.exports = { getNotifications };
