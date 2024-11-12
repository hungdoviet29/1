const mongoose = require('mongoose');
const db = require('./db');

const userSchema = new mongoose.Schema(
  {
    tenDangNhap: {type: String, required: true, unique: true},
    matKhau: {type: String, required: true},
    vaiTro: {type: String, required: true},
    roll: {type: Number, required: true},
    hoSo: {type: Object, default: {}}, // Cung cấp giá trị mặc định
    lichSuDonHang: {type: Array, default: []}, // Cung cấp giá trị mặc định
    sanPhamYeuThich: {type: Array, default: []}, // Cung cấp giá trị mặc định
    avatar: {
      type: String,
      default:
        'https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg',
    }, // Thêm trường avatar
  },
  {
    collection: 'users',
    timestamps: true,
    _id: true, // Đảm bảo rằng _id được cấu hình đúng
  },
);

// So sánh mật khẩu trực tiếp (không sử dụng bcrypt)
userSchema.methods.comparePassword = function (candidatePassword) {
  return this.matKhau === candidatePassword; // So sánh trực tiếp mật khẩu
};

const UserModel = mongoose.model('User', userSchema);
module.exports = {UserModel};
