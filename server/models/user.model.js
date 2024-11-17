const mongoose = require('mongoose');
const db = require('./db');

// Định nghĩa schema người dùng
const userSchema = new mongoose.Schema(
  {
    tenDangNhap: {
      type: String,
      required: [true, 'Tên đăng nhập là bắt buộc'],
      unique: true, // Đảm bảo tên đăng nhập là duy nhất
      trim: true, // Loại bỏ khoảng trắng thừa
    },
    matKhau: {
      type: String,
      required: [true, 'Mật khẩu là bắt buộc'],
    },
    vaiTro: {
      type: String,
      required: [true, 'Vai trò là bắt buộc'],
      enum: ['user', 'admin'], // Đảm bảo vai trò hợp lệ
      default: 'user', // Vai trò mặc định là user
    },
    roll: {
      type: Number,
      required: [true, 'Roll là bắt buộc'],
      min: 1, // Giá trị nhỏ nhất là 1
    },
    hoSo: {
      type: Object,
      default: {}, // Giá trị mặc định là object rỗng
    },
    lichSuDonHang: {
      type: [Object], // Mảng object (thay vì mảng bất kỳ)
      default: [], // Mặc định là mảng rỗng
    },
    sanPhamYeuThich: {
      type: [Object], // Mảng object
      default: [], // Mặc định là mảng rỗng
    },
    avatar: {
      type: String,
      default:
        'https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg', // URL avatar mặc định
    },
  },
  {
    collection: 'users', // Tên collection trong MongoDB
    timestamps: true, // Thêm createdAt và updatedAt
  }
);


userSchema.methods.comparePassword = function (candidatePassword) {
  return this.matKhau === candidatePassword; // So sánh trực tiếp mật khẩu
};

// Tạo model người dùng từ schema
const UserModel = mongoose.model('User', userSchema);

module.exports = { UserModel };
