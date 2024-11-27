const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    tenDangNhap: {
      type: String,
      // required: [true, 'Tên đăng nhập là bắt buộc'],
      //  unique: true,
      // trim: true,
    },
    matKhau: {
      type: String,
      required: [true, 'Mật khẩu là bắt buộc'],
    },
    trangThai: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    }, // Thêm trạng thái
    email: {
      type: String,
    },
    phone: {
      type: String,
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
    sanPhamYeuThich: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'LapStore', default: []},
    ],
  },
  {timestamps: true, collection: 'users'},
);

const UserModel = mongoose.model('User', userSchema);

module.exports = {UserModel};
