const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    tenDangNhap: {
      type: String,
      required: [true, 'Tên đăng nhập là bắt buộc'],
      unique: true,
      trim: true,
    },
    matKhau: {
      type: String,
      required: [true, 'Mật khẩu là bắt buộc'],
    },
    email: {
      type: String,
      required: [true, 'Email là bắt buộc'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Định dạng email không hợp lệ'],
    },
    phone: {
      type: String,
      required: [true, 'Số điện thoại là bắt buộc'],
      match: [/^[0-9]{10,12}$/, 'Số điện thoại phải từ 10-12 chữ số'],
    },
    diaChi: {
      type: String,
      trim: true,
      default: '',
    },
    avatar: {
      type: String,
      default:
        'https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg',
    },
  },
  { timestamps: true, collection: 'users' }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = { UserModel };
