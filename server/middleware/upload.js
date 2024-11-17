const multer = require('multer');
const fs = require('fs');

// Định nghĩa cấu hình lưu trữ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'public/uploads'; // Thư mục lưu trữ
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Tạo thư mục nếu chưa tồn tại
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Đặt tên file
  },
});

// Tạo instance của multer
const upload = multer({ storage: storage });

module.exports = upload;
