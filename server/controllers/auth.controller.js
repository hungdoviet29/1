const {UserModel} = require('../models/user.model');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');

// Hàm: Lấy danh sách tất cả người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Hàm: Lấy thông tin người dùng theo ID
exports.getUserById = async (req, res) => {
  try {
    const {id} = req.params;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: 'ID không hợp lệ.'});
    }

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({message: 'Không tìm thấy người dùng.'});
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Hàm: Đăng ký người dùng mới
exports.register = async (req, res) => {
  const {tenDangNhap, matKhau, email} = req.body;

  try {
    const existingUser = await UserModel.findOne({tenDangNhap});
    if (existingUser) {
      return res.status(400).json({message: 'Tên đăng nhập đã tồn tại'});
    }

    const newUser = new UserModel({
      tenDangNhap,
      matKhau,
      email,
    });

    const savedUser = await newUser.save();
    res.status(201).json({message: 'Đăng ký thành công', user: savedUser});
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Hàm: Đăng nhập
exports.login = async (req, res) => {
  const {tenDangNhap, matKhau} = req.body;

  try {
    const user = await UserModel.findOne({tenDangNhap});
    if (!user || user.matKhau !== matKhau) {
      return res
        .status(401)
        .json({message: 'Sai tên đăng nhập hoặc mật khẩu.'});
    }

    res.status(200).json({message: 'Đăng nhập thành công', user});
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Hàm: Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
  const {id} = req.params;
  const {email, phone, diaChi, tenDangNhap} = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: 'ID không hợp lệ.'});
    }

    const updateData = {email, phone, diaChi, tenDangNhap};

    const user = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true, // Trả về user đã cập nhật
      runValidators: true, // Đảm bảo dữ liệu tuân theo schema
    });

    if (!user) {
      return res.status(404).json({message: 'Không tìm thấy người dùng.'});
    }

    res.status(200).json({message: 'Cập nhật thành công', user});
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin người dùng:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};
// Hàm: quên mật khẩu
exports.forgotPassword = async (req, res) => {
  const {email} = req.body;
  try {
    // Kiểm tra xem người dùng có tồn tại hay không
    const user = await UserModel.findOne({email});
    if (!user) {
      return res.status(200).json({
        message:
          'Nếu email tồn tại, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu.',
      });
    }

    // Tạo mật khẩu mới
    const newPassword = Math.random().toString(36).slice(-8);
    user.matKhau = newPassword; // Lưu trực tiếp mật khẩu mới vào cơ sở dữ liệu

    // Lưu mật khẩu mới
    try {
      await user.save();
    } catch (saveError) {
      console.error('Lỗi khi lưu mật khẩu mới:', saveError);
      return res
        .status(500)
        .json({message: 'Lỗi server. Không thể cập nhật mật khẩu.'});
    }

    // Cấu hình Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nguyentientai280403@gmail.com', // Email chủ
        pass: 'hpxf rofh oplt rykx', // Mật khẩu ứng dụng
      },
    });

    // Nội dung email
    const mailOptions = {
      from: 'nguyentientai280403@gmail.com',
      to: email,
      subject: 'Đặt lại mật khẩu của bạn',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .email-header {
                text-align: center;
                padding-bottom: 20px;
              }
              .email-header img {
                width: 100px;
              }
              .email-body {
                text-align: center;
                padding: 20px;
              }
              .email-body h2 {
                color: #333333;
                margin-bottom: 20px;
              }
              .email-body p {
                color: #666666;
                font-size: 16px;
                line-height: 1.5;
              }
              .new-password {
                font-size: 18px;
                font-weight: bold;
                color: #4CAF50;
                margin-top: 10px;
              }
              .footer {
                text-align: center;
                padding-top: 20px;
                font-size: 14px;
                color: #777777;
              }
              .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #4CAF50;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="email-header">
                <img src="https://png.pngtree.com/png-vector/20190322/ourlarge/pngtree-online-shop-logo-vector-template-design-illustration-png-image_860085.jpg" alt="Logo" />
              </div>
              <div class="email-body">
                <h2>Đặt lại mật khẩu của bạn</h2>
                <p>Chúng tôi đã nhận được yêu cầu thay đổi mật khẩu cho tài khoản của bạn. Vui lòng sử dụng mật khẩu mới dưới đây để đăng nhập:</p>
                <div class="new-password">
                  Mật khẩu mới: <strong>${newPassword}</strong>
                </div>
                <p>Bạn có thể đăng nhập lại với mật khẩu mới này. Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng liên hệ với chúng tôi ngay lập tức.</p>
                <a href="https://yourapp.com/login" class="button">Đăng nhập ngay</a>
              </div>
              <div class="footer">
                <p>Trân trọng,<br>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Gửi email
    try {
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.error('Lỗi khi gửi email:', mailError);
      return res
        .status(500)
        .json({message: 'Không thể gửi email. Vui lòng thử lại sau.'});
    }
    // Gửi phản hồi thành công
    res.status(200).json({
      message: 'Mật khẩu mới đã được gửi qua email.',
      redirect: 'LoginScreen', // Địa chỉ trang đăng nhập
    });
  } catch (error) {
    console.error('Lỗi khi quên mật khẩu:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};
// Hàm: Thay đổi mật khẩu (Không validate, không mã hóa)
exports.changePassword = async (req, res) => {
  const {id} = req.params; // Lấy ID người dùng từ params
  const {newPassword} = req.body; // Chỉ cần mật khẩu mới từ body

  try {
    // Kiểm tra xem id có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: 'ID người dùng không hợp lệ.'});
    }

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({message: 'Không tìm thấy người dùng.'});
    }

    // Cập nhật mật khẩu mới
    user.matKhau = newPassword;

    // Lưu lại thay đổi trong cơ sở dữ liệu
    await user.save();

    res.status(200).json({message: 'Mật khẩu đã được thay đổi thành công.'});
  } catch (error) {
    console.error('Lỗi khi thay đổi mật khẩu:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Hàm: Xóa người dùng
exports.deleteUser = async (req, res) => {
  const {id} = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: 'ID không hợp lệ.'});
    }

    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({message: 'Không tìm thấy người dùng.'});
    }

    res.status(200).json({message: 'Xóa người dùng thành công.'});
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Các hàm yêu thích sản phẩm
exports.getFavoriteProducts = async (req, res) => {
  const {userId} = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({message: 'ID không hợp lệ'});
    }

    const user = await UserModel.findById(userId).populate('sanPhamYeuThich');
    if (!user) {
      return res.status(404).json({message: 'Người dùng không tồn tại'});
    }

    res.status(200).json({favorites: user.sanPhamYeuThich});
  } catch (error) {
    console.error('Lỗi server:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

exports.addFavoriteProduct = async (req, res) => {
  const {userId, productId} = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'Người dùng không tồn tại'});
    }

    if (user.sanPhamYeuThich.includes(productId)) {
      return res
        .status(400)
        .json({message: 'Sản phẩm đã có trong danh sách yêu thích'});
    }

    user.sanPhamYeuThich.push(productId); // Thêm sản phẩm vào danh sách yêu thích
    await user.save();
    res.status(200).json({message: 'Đã thêm sản phẩm vào danh sách yêu thích'});
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm vào danh sách yêu thích:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

exports.removeFavoriteProduct = async (req, res) => {
  const {userId, productId} = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'Người dùng không tồn tại'});
    }

    const productIndex = user.sanPhamYeuThich.indexOf(productId);
    if (productIndex === -1) {
      return res
        .status(400)
        .json({message: 'Sản phẩm không có trong danh sách yêu thích'});
    }

    user.sanPhamYeuThich.splice(productIndex, 1); // Xóa sản phẩm khỏi danh sách yêu thích
    await user.save();
    res.status(200).json({message: 'Đã xóa sản phẩm khỏi danh sách yêu thích'});
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm yêu thích:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Hàm xóa sản phẩm khỏi danh sách yêu thích
exports.removeFavoriteProduct = async (req, res) => {
  const {userId, productId} = req.body;

  try {
    // Tìm người dùng và kiểm tra sản phẩm có trong danh sách yêu thích của họ không
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'Người dùng không tồn tại.'});
    }

    const productIndex = user.favorites.findIndex(
      item => item._id.toString() === productId,
    );
    if (productIndex === -1) {
      return res
        .status(404)
        .json({message: 'Sản phẩm không có trong danh sách yêu thích.'});
    }

    // Xóa sản phẩm khỏi danh sách yêu thích
    user.favorites.splice(productIndex, 1);
    await user.save();

    res
      .status(200)
      .json({message: 'Sản phẩm đã bị xóa khỏi danh sách yêu thích.'});
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm yêu thích:', error);
    res.status(500).json({message: 'Lỗi server', error});
  }
};

// Hàm xóa sản phẩm khỏi danh sách yêu thích
exports.removeFavoriteProduct = async (req, res) => {
  const {userId, productId} = req.params;

  try {
    // Kiểm tra xem userId có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({message: 'ID người dùng không hợp lệ'});
    }

    // Kiểm tra xem productId có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({message: 'ID sản phẩm không hợp lệ'});
    }

    // Tìm người dùng
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'Người dùng không tồn tại'});
    }

    // Chuyển productId thành ObjectId để so sánh
    const objectId = new mongoose.Types.ObjectId(productId); // Dùng new để khởi tạo ObjectId

    // Kiểm tra xem sản phẩm có trong danh sách yêu thích không
    const productIndex = user.sanPhamYeuThich.indexOf(objectId);
    if (productIndex === -1) {
      return res
        .status(400)
        .json({message: 'Sản phẩm không có trong danh sách yêu thích'});
    }

    // Xóa sản phẩm khỏi danh sách yêu thích
    user.sanPhamYeuThich.splice(productIndex, 1);
    await user.save(); // Lưu lại thay đổi

    res
      .status(200)
      .json({message: 'Sản phẩm đã bị xóa khỏi danh sách yêu thích'});
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm yêu thích:', error); // In lỗi chi tiết ra console
    res.status(500).json({message: 'Lỗi server', error: error.message}); // Trả lại lỗi chi tiết
  }
};
// Cấu hình lưu trữ file hình ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Chỉ định thư mục lưu trữ ảnh
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Tạo tên file duy nhất cho ảnh
  },
});

const upload = multer({storage: storage}); // Khởi tạo multer với cấu hình trên

// Hàm: Cập nhật ảnh đại diện người dùng
exports.updateImage = [
  upload.single('image'),
  async (req, res) => {
    const {userId} = req.params;

    try {
      // Kiểm tra xem người dùng có tồn tại không
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({message: 'ID người dùng không hợp lệ'});
      }

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({message: 'Người dùng không tồn tại'});
      }

      // Kiểm tra xem đã tải ảnh lên chưa
      if (!req.file) {
        return res.status(400).json({message: 'Không có ảnh nào được tải lên'});
      }

      // Cập nhật ảnh đại diện cho người dùng
      user.avatar = req.file.path; // Lưu đường dẫn ảnh vào cơ sở dữ liệu

      await user.save();

      res.status(200).json({
        message: 'Cập nhật ảnh đại diện thành công',
        avatar: user.avatar,
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật ảnh đại diện:', error);
      res.status(500).json({message: 'Lỗi server', error});
    }
  },
];
