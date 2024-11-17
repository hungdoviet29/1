const { UserModel } = require('../models/user.model');
const mongoose = require('mongoose');

// Hàm: Lấy danh sách tất cả người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Hàm: Lấy thông tin người dùng theo ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ.' });
    }

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Hàm: Đăng ký người dùng mới
exports.register = async (req, res) => {
  const { tenDangNhap, matKhau, email, phone, diachi } = req.body;

  try {
    const existingUser = await UserModel.findOne({ tenDangNhap });
    if (existingUser) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
    }

    const newUser = new UserModel({
      tenDangNhap,
      matKhau,
      email,
      phone,
      diachi,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'Đăng ký thành công', user: savedUser });
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Hàm: Đăng nhập
exports.login = async (req, res) => {
  const { tenDangNhap, matKhau } = req.body;

  try {
    const user = await UserModel.findOne({ tenDangNhap });
    if (!user || user.matKhau !== matKhau) {
      return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu.' });
    }

    res.status(200).json({ message: 'Đăng nhập thành công', user });
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Hàm: Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, phone, diaChi, tenDangNhap } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ.' });
    }

    const updateData = { email, phone, diaChi, tenDangNhap };

    const user = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true, // Trả về user đã cập nhật
      runValidators: true, // Đảm bảo dữ liệu tuân theo schema
    });

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
    }

    res.status(200).json({ message: 'Cập nhật thành công', user });
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin người dùng:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};



// Hàm: Thay đổi mật khẩu
exports.changePassword = async (req, res) => {
  const { tenDangNhap, oldPassword, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({ tenDangNhap });
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại.' });
    }

    if (user.matKhau !== oldPassword) {
      return res.status(401).json({ message: 'Mật khẩu cũ không đúng.' });
    }

    user.matKhau = newPassword;
    await user.save();

    res.status(200).json({ message: 'Đổi mật khẩu thành công.' });
  } catch (error) {
    console.error('Lỗi khi đổi mật khẩu:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Hàm: Quên mật khẩu
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
    }

    const newPassword = Math.random().toString(36).slice(-8);
    user.matKhau = newPassword;
    await user.save();

    res.status(200).json({ message: 'Mật khẩu mới đã được gửi qua email.' });
  } catch (error) {
    console.error('Lỗi khi quên mật khẩu:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Hàm: Xóa người dùng
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ.' });
    }

    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
    }

    res.status(200).json({ message: 'Xóa người dùng thành công.' });
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};
