const express = require('express');
const {
  register,
  login,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  changePassword,
  forgotPassword,
} = require('../controllers/auth.controller');

const router = express.Router();

// Route: Lấy danh sách tất cả người dùng
router.get('/', getAllUsers);

// Route: Lấy thông tin người dùng theo ID
router.get('/:id', getUserById);

// Route: Đăng ký người dùng mới
router.post('/register', register);

// Route: Đăng nhập
router.post('/login', login);

// Route: Cập nhật thông tin người dùng
router.put('/:id', updateUser);

// Route: Thay đổi mật khẩu
router.put('/changePassword', changePassword);

// Route: Quên mật khẩu
router.post('/forgotPassword', forgotPassword);

// Route: Xóa người dùng
router.delete('/:id', deleteUser);

module.exports = router;
