const {UserModel} = require('../models/user.model'); // Đảm bảo import đúng model User

// Hàm xóa người dùng theo ID
exports.deleteUser = async (req, res) => {
  try {
    const {id} = req.params; // Lấy ID từ URL
    console.log('Received User ID:', id); // Log ID

    if (!id || id.length !== 24) {
      return res.status(400).json({message: 'ID không hợp lệ'});
    }

    // Kiểm tra người dùng có tồn tại không
    const user = await UserModel.findById(id);
    if (!user) {
      console.log('Không tìm thấy người dùng với ID:', id);
      return res.status(404).json({message: 'Không tìm thấy người dùng'});
    }

    // Nếu người dùng tồn tại, thực hiện xóa
    await UserModel.findByIdAndDelete(id);
    return res.json({message: 'Xóa người dùng thành công'});
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error);
    return res.status(500).json({message: 'Lỗi khi xóa người dùng', error});
  }
};

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
    avatar = 'https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg', // URL ảnh mặc định
  } = req.body;

  try {
    const existingUser = await UserModel.findOne({tenDangNhap});
    if (existingUser) {
      return res.status(400).json({message: 'Tên đăng nhập đã tồn tại'});
    }

    const newUser = new UserModel({
      tenDangNhap,
      matKhau,
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
    const user = await UserModel.findOne({tenDangNhap});
    if (!user || user.matKhau !== matKhau) {
      return res.status(401).json({message: 'Sai tên đăng nhập hoặc mật khẩu'});
    }

    res.status(200).json({message: 'Đăng nhập thành công!', user});
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    res.status(500).json({message: 'Lỗi đăng nhập người dùng', error});
  }
};
