const { UserModel } = require('../models/user.model');

// Hàm: Thêm sản phẩm vào danh sách yêu thích
exports.addFavoriteProduct = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Kiểm tra userId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID người dùng không hợp lệ.' });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
    }

    // Cập nhật danh sách yêu thích
    if (!user.favorites) user.favorites = [];
    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
    }

    await user.save();

    res.status(200).json({ message: 'Thêm sản phẩm vào yêu thích thành công.', favorites: user.favorites });
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm yêu thích:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};
