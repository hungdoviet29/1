const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Định nghĩa cấu hình lưu trữ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../public/uploads'); // Đường dẫn lưu trữ
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true}); // Tạo thư mục nếu chưa tồn tại
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Đặt tên file: thời gian + tên gốc của file
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Bộ lọc file để kiểm tra định dạng file hợp lệ
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Chấp nhận file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG are allowed.'), false);
  }
};

// Tạo instance của multer
const upload = multer({
  storage: storage,
  limits: {fileSize: 5 * 1024 * 1024}, // Giới hạn file 5MB
  fileFilter: fileFilter, // Lọc file
});

module.exports = upload;
