const {UserModel} = require('../models/user.model'); // Đảm bảo import đúng model User

// Hàm đăng ký
exports.register = async (req, res) => {
  const {
    tenDangNhap,
    matKhau,
    vaiTro = 'user',
    roll = 2,
    hoSo = {},
    lichSuDonHang = [],
    sanPhamYeuThich = [],
  } = req.body;

  try {
    // Kiểm tra nếu người dùng đã tồn tại
    const existingUser = await UserModel.findOne({tenDangNhap});
    if (existingUser) {
      return res.status(400).json({message: 'Tên đăng nhập đã tồn tại'});
    }

    // Tạo người dùng mới
    const newUser = new UserModel({
      tenDangNhap,
      matKhau, // Để mật khẩu trong dạng text, không mã hóa
      vaiTro,
      roll,
      hoSo,
      lichSuDonHang,
      sanPhamYeuThich,
    });
    await newUser.save();
    res.status(201).json({message: 'Đăng ký thành công!'});
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
    res.status(500).json({message: 'Lỗi đăng ký người dùng', error});
  }
};

// Hàm đăng nhập
exports.login = async (req, res) => {
  const {tenDangNhap, matKhau} = req.body;

  try {
    // Kiểm tra thông tin người dùng
    const user = await UserModel.findOne({tenDangNhap});
    if (!user) {
      return res.status(401).json({message: 'Sai tên đăng nhập hoặc mật khẩu'});
    }

    // Kiểm tra mật khẩu (không mã hóa mật khẩu trong thực tế)
    if (user.matKhau !== matKhau) {
      return res.status(401).json({message: 'Sai tên đăng nhập hoặc mật khẩu'});
    }

    res.status(200).json({message: 'Đăng nhập thành công!', user});
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    res.status(500).json({message: 'Lỗi đăng nhập người dùng', error});
  }
};
