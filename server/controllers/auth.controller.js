const {UserModel} = require('../models/user.model');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Hàm: Lấy danh sách tất cả người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Hàm: Lấy thông tin người dùng theo ID
exports.getUserById = async (req, res) => {
  try {
    const {id} = req.params;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: 'ID không hợp lệ.'});
    }

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({message: 'Không tìm thấy người dùng.'});
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Hàm: Đăng ký người dùng mới
exports.register = async (req, res) => {
  const {tenDangNhap, matKhau, email, phone, diachi} = req.body;

  try {
    const existingUser = await UserModel.findOne({tenDangNhap});
    if (existingUser) {
      return res.status(400).json({message: 'Tên đăng nhập đã tồn tại'});
    }

    const newUser = new UserModel({
      tenDangNhap,
      matKhau,
      email,
      phone,
      diachi,
    });

    const savedUser = await newUser.save();
    res.status(201).json({message: 'Đăng ký thành công', user: savedUser});
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Hàm: Đăng nhập
exports.login = async (req, res) => {
  const {tenDangNhap, matKhau} = req.body;

  try {
    const user = await UserModel.findOne({tenDangNhap});
    if (!user || user.matKhau !== matKhau) {
      return res
        .status(401)
        .json({message: 'Sai tên đăng nhập hoặc mật khẩu.'});
    }

    res.status(200).json({message: 'Đăng nhập thành công', user});
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Hàm: Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
  const {id} = req.params;
  const {email, phone, diaChi, tenDangNhap} = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: 'ID không hợp lệ.'});
    }

    const updateData = {email, phone, diaChi, tenDangNhap};

    const user = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true, // Trả về user đã cập nhật
      runValidators: true, // Đảm bảo dữ liệu tuân theo schema
    });

    if (!user) {
      return res.status(404).json({message: 'Không tìm thấy người dùng.'});
    }

    res.status(200).json({message: 'Cập nhật thành công', user});
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin người dùng:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Hàm: Thay đổi mật khẩu
exports.changePassword = async (req, res) => {
  const {tenDangNhap, oldPassword, newPassword} = req.body;

  try {
    const user = await UserModel.findOne({tenDangNhap});
    if (!user) {
      return res.status(404).json({message: 'Người dùng không tồn tại.'});
    }

    if (user.matKhau !== oldPassword) {
      return res.status(401).json({message: 'Mật khẩu cũ không đúng.'});
    }

    user.matKhau = newPassword;
    await user.save();

    res.status(200).json({message: 'Đổi mật khẩu thành công.'});
  } catch (error) {
    console.error('Lỗi khi đổi mật khẩu:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Hàm: Quên mật khẩu
exports.forgotPassword = async (req, res) => {
  const {email} = req.body;

  try {
    const user = await UserModel.findOne({email});
    if (!user) {
      return res.status(404).json({message: 'Không tìm thấy người dùng.'});
    }

    const newPassword = Math.random().toString(36).slice(-8);
    user.matKhau = newPassword;
    await user.save();

    res.status(200).json({message: 'Mật khẩu mới đã được gửi qua email.'});
  } catch (error) {
    console.error('Lỗi khi quên mật khẩu:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Hàm: Xóa người dùng
exports.deleteUser = async (req, res) => {
  const {id} = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: 'ID không hợp lệ.'});
    }

    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({message: 'Không tìm thấy người dùng.'});
    }

    res.status(200).json({message: 'Xóa người dùng thành công.'});
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Các hàm yêu thích sản phẩm
exports.getFavoriteProducts = async (req, res) => {
  const {userId} = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({message: 'ID không hợp lệ'});
    }

    const user = await UserModel.findById(userId).populate('sanPhamYeuThich');
    if (!user) {
      return res.status(404).json({message: 'Người dùng không tồn tại'});
    }

    res.status(200).json({favorites: user.sanPhamYeuThich});
  } catch (error) {
    console.error('Lỗi server:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

exports.addFavoriteProduct = async (req, res) => {
  const {userId, productId} = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'Người dùng không tồn tại'});
    }

    if (user.sanPhamYeuThich.includes(productId)) {
      return res
        .status(400)
        .json({message: 'Sản phẩm đã có trong danh sách yêu thích'});
    }

    user.sanPhamYeuThich.push(productId); // Thêm sản phẩm vào danh sách yêu thích
    await user.save();
    res.status(200).json({message: 'Đã thêm sản phẩm vào danh sách yêu thích'});
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm vào danh sách yêu thích:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

exports.removeFavoriteProduct = async (req, res) => {
  const {userId, productId} = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'Người dùng không tồn tại'});
    }

    const productIndex = user.sanPhamYeuThich.indexOf(productId);
    if (productIndex === -1) {
      return res
        .status(400)
        .json({message: 'Sản phẩm không có trong danh sách yêu thích'});
    }

    user.sanPhamYeuThich.splice(productIndex, 1); // Xóa sản phẩm khỏi danh sách yêu thích
    await user.save();
    res.status(200).json({message: 'Đã xóa sản phẩm khỏi danh sách yêu thích'});
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm yêu thích:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Hàm xóa sản phẩm khỏi danh sách yêu thích
exports.removeFavoriteProduct = async (req, res) => {
  const {userId, productId} = req.body;

  try {
    // Tìm người dùng và kiểm tra sản phẩm có trong danh sách yêu thích của họ không
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'Người dùng không tồn tại.'});
    }

    const productIndex = user.favorites.findIndex(
      item => item._id.toString() === productId,
    );
    if (productIndex === -1) {
      return res
        .status(404)
        .json({message: 'Sản phẩm không có trong danh sách yêu thích.'});
    }

    // Xóa sản phẩm khỏi danh sách yêu thích
    user.favorites.splice(productIndex, 1);
    await user.save();

    res
      .status(200)
      .json({message: 'Sản phẩm đã bị xóa khỏi danh sách yêu thích.'});
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm yêu thích:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Hàm xóa sản phẩm khỏi danh sách yêu thích
exports.removeFavoriteProduct = async (req, res) => {
  const {userId, productId} = req.params;

  try {
    // Kiểm tra xem userId có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({message: 'ID người dùng không hợp lệ'});
    }

    // Kiểm tra xem productId có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({message: 'ID sản phẩm không hợp lệ'});
    }

    // Tìm người dùng
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'Người dùng không tồn tại'});
    }

    // Chuyển productId thành ObjectId để so sánh
    const objectId = new mongoose.Types.ObjectId(productId); // Dùng new để khởi tạo ObjectId

    // Kiểm tra xem sản phẩm có trong danh sách yêu thích không
    const productIndex = user.sanPhamYeuThich.indexOf(objectId);
    if (productIndex === -1) {
      return res
        .status(400)
        .json({message: 'Sản phẩm không có trong danh sách yêu thích'});
    }

    // Xóa sản phẩm khỏi danh sách yêu thích
    user.sanPhamYeuThich.splice(productIndex, 1);
    await user.save(); // Lưu lại thay đổi

    res
      .status(200)
      .json({message: 'Sản phẩm đã bị xóa khỏi danh sách yêu thích'});
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm yêu thích:', error); // In lỗi chi tiết ra console
    res.status(500).json({message: 'Lỗi server', error: error.message}); // Trả lại lỗi chi tiết
  }
};
// Cấu hình lưu trữ file hình ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Chỉ định thư mục lưu trữ ảnh
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Tạo tên file duy nhất cho ảnh
  },
});

const upload = multer({storage: storage}); // Khởi tạo multer với cấu hình trên

// Hàm: Cập nhật ảnh đại diện người dùng
exports.updateImage = [
  upload.single('image'),
  async (req, res) => {
    const {userId} = req.params;

    try {
      // Kiểm tra xem người dùng có tồn tại không
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({message: 'ID người dùng không hợp lệ'});
      }

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({message: 'Người dùng không tồn tại'});
      }

      // Kiểm tra xem đã tải ảnh lên chưa
      if (!req.file) {
        return res.status(400).json({message: 'Không có ảnh nào được tải lên'});
      }

      // Cập nhật ảnh đại diện cho người dùng
      user.avatar = req.file.path; // Lưu đường dẫn ảnh vào cơ sở dữ liệu

      await user.save();

      res.status(200).json({
        message: 'Cập nhật ảnh đại diện thành công',
        avatar: user.avatar,
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật ảnh đại diện:', error);
      res.status(500).json({message: 'Lỗi server', error});
    }
  },
];
