const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema(
  {
    ten: { type: String, required: true },
    moTa: { type: String, required: true },
    gia: { type: Number, required: true },
    hinhAnh: { type: String, required: true },
    danhMuc: { 
      type: String, 
      required: true,
      enum: ['Popular', 'Trending', 'News', 'Sale', 'New', 'sale'], // Thêm các giá trị khác
    },
    soLuong: { type: Number, required: true },
    hang: { type: String, required: true },
    // câc trường mới 
    CPU: { type: String, required: true }, // Thêm trường CPU
    RAM: { type: String, required: true }, // Thêm trường RAM
    CardManHinh: { type: String, required: true }, // Thêm trường CardManHinh
    KichThuocManHinh: { type: String, required: true }, // Thêm trường KichThuocManHinh
  },
  {
    collection: "laptops", // Tên collection trong MongoDB
    timestamps: true,
  }
);
//sgdsyugds
const laptopModel = mongoose.model("LapStore", laptopSchema);

module.exports = { laptopModel };