var express = require('express');
var router = express.Router();
const {
  register,
  login,
  getAllUsers,
  deleteUser,
  changePassword,
  forgotPassword,
  getUserById,
} = require('../controllers/auth.controller');


const { UserModel } = require('../models/user.model');

router.get('/:id', getUserById); // Đặt trước
router.get('/', async function (req, res) {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách người dùng' });
  }
});




// Route xóa người dùng
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
