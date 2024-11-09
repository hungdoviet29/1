const db = require("./db");
const mongoose = db.mongoose;

const laptopSchema = new mongoose.Schema(
  {
    ten: { type: String, required: true },
    moTa: { type: String, required: true },
    gia: { type: Number, required: true },
    hinhAnh: { type: String, required: true },
    danhMuc: { 
      type: String, 
      required: true,
      enum: ['Popular', 'Trending', 'News', 'Sale'], // Giới hạn các giá trị của danh mục
    },
    soLuongTonKho: { type: Number, required: true },
    danhGia: { type: Number, required: true },
    cpu: { type: String, required: true },
    ram: { type: String, required: true },
    cardDoHoa: { type: String, required: true },
    trongLuong: { type: String, required: true },
    thoiLuongPin: { type: String, required: true },
    khoangGia: { type: String, required: true },
  },
  {
    collection: "laptops", // Tên collection trong MongoDB
    timestamps: true,
  }
);

const laptopModel = mongoose.model("LapStore", laptopSchema);

module.exports = { laptopModel };
