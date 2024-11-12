var express = require('express');
var router = express.Router();
const {
  register,
  login,
  getAllUsers,
  deleteUser,
  changePassword,
  forgotPassword, // Thêm forgotPassword vào
} = require('../controllers/auth.controller');
const {UserModel} = require('../models/user.model');

// Route lấy danh sách người dùng
router.get('/', async function (req, res, next) {
  try {
    const users = await UserModel.find(); // Truy vấn tất cả người dùng từ MongoDB
    res.json(users); // Trả về danh sách người dùng, bao gồm trường avatar
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error);
    res.status(500).json({message: 'Lỗi khi lấy danh sách người dùng'});
  }
});

// Xử lý xóa người dùng
router.delete('/:id', deleteUser); // Đảm bảo rằng bạn đang sử dụng đường dẫn đúng

// Route đăng ký
router.post('/register', register);

// Route đăng nhập
router.post('/login', login);

// Route thay đổi mật khẩu
router.put('/changePassword', changePassword);

// Route quên mật khẩu
router.post('/forgotPassword', forgotPassword); // Thêm route forgotPassword

module.exports = router;
