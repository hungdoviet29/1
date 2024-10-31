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
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

const UserModel = mongoose.model('User', userSchema);
module.exports = {UserModel};
