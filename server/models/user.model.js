const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs'); // Import bcryptjs để mã hóa mật khẩu
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

// ================ Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu ==================
// userSchema.pre('save', async function (next) {
//   if (this.isModified('matKhau') || this.isNew) {
//     try {
//       const salt = await bcrypt.genSalt(10); // Tạo salt
//       this.matKhau = await bcrypt.hash(this.matKhau, salt); // Mã hóa mật khẩu
//       next();
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     return next();
//   }
// });

// Kiểm tra mật khẩu khi đăng nhập
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.matKhau); // So sánh mật khẩu
  } catch (error) {
    throw error;
  }
};

const UserModel = mongoose.model('User', userSchema);
module.exports = {UserModel};
