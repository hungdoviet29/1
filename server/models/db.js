const mongoose = require('mongoose');
require('dotenv').config(); // Đảm bảo biến môi trường được tải

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Kết nối MongoDB thành công.');
}).catch(err => {
  console.error('Lỗi kết nối MongoDB:', err);
});
