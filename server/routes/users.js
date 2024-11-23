const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const upload = require('../middleware/upload');

// Routes cho người dùng
router.get('/users', authController.getAllUsers);
router.get('/users/:id', authController.getUserById);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/update/:id', authController.updateUser);
router.put('/changePassword/:id', authController.changePassword);
router.post('/forgotPassword', authController.forgotPassword);
router.delete('/delete/:id', authController.deleteUser);
router.post(
  '/user/:userId/image',
  upload.single('avatar'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({error: 'Không có tệp nào được tải lên'});
      }
      // Lưu đường dẫn tệp vào database hoặc thực hiện các bước tiếp theo
      const avatarUrl = req.file.path; // Đường dẫn tệp tải lên
      res
        .status(200)
        .json({message: 'Tải ảnh thành công', avatarUrl: avatarUrl});
    } catch (error) {
      console.error('Lỗi xử lý upload:', error);
      res.status(500).json({error: 'Đã xảy ra lỗi trong quá trình upload'});
    }
  },
);

// Routes cho yêu thích sản phẩm
router.get('/favorites/:userId', authController.getFavoriteProducts);
router.post('/favorites', authController.addFavoriteProduct);
// router.post('/removeFavoriteProduct', authController.removeFavoriteProduct);
router.post('/addFavoriteProduct', authController.addFavoriteProduct);
// Route xóa sản phẩm khỏi danh sách yêu thích
router.delete(
  '/favorites/:userId/:productId',
  authController.removeFavoriteProduct,
); // Xóa sản phẩm khỏi yêu thích

module.exports = router;
