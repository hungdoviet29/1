const { UserModel } = require('../models/user.model'); // Đảm bảo import đúng model User
const { CartModel } = require('../models/cart_model'); // Đảm bảo import đúng model Cart
const nodemailer = require('nodemailer'); // Thư viện gửi email cho người dùng

// Hàm xóa người dùng theo ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ URL
    console.log('Received User ID:', id); // Log ID

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    // Kiểm tra người dùng có tồn tại không
    const user = await UserModel.findById(id);
    if (!user) {
      console.log('Không tìm thấy người dùng với ID:', id);
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // Nếu người dùng tồn tại, thực hiện xóa
    await UserModel.findByIdAndDelete(id);
    return res.json({ message: 'Xóa người dùng thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error);
    return res.status(500).json({ message: 'Lỗi khi xóa người dùng', error });
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
    // Kiểm tra tên đăng nhập đã tồn tại chưa
    const existingUser = await UserModel.findOne({ tenDangNhap });
    if (existingUser) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
    }

    // Tạo người dùng mới
    const newUser = new UserModel({
      tenDangNhap,
      matKhau,
      vaiTro,
      roll,
      hoSo,
      lichSuDonHang,
      sanPhamYeuThich,
      avatar,
    });

    const savedUser = await newUser.save();

    // Tạo giỏ hàng mặc định cho người dùng mới
    const newCart = new CartModel({
      userId: savedUser._id,
      items: [],
    });
    await newCart.save();

    res.status(201).json({
      message: 'Đăng ký thành công và giỏ hàng đã được tạo.',
      user: savedUser,
    });
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
    res.status(500).json({ message: 'Lỗi đăng ký người dùng', error });
  }
};

// Hàm đăng nhập
exports.login = async (req, res) => {
  const { tenDangNhap, matKhau } = req.body;

  try {
    const user = await UserModel.findOne({ tenDangNhap });
    if (!user || user.matKhau !== matKhau) {
      return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
    }

    res.status(200).json({ message: 'Đăng nhập thành công!', user });
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    res.status(500).json({ message: 'Lỗi đăng nhập người dùng', error });
  }
};

// Hàm thay đổi mật khẩu
exports.changePassword = async (req, res) => {
  const { tenDangNhap, oldPassword, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({ tenDangNhap });
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    // So sánh mật khẩu cũ (so sánh trực tiếp vì không cần bcrypt)
    if (user.matKhau !== oldPassword) {
      return res.status(401).json({ message: 'Mật khẩu cũ không đúng' });
    }

    // Cập nhật mật khẩu mới
    user.matKhau = newPassword;
    await user.save();
    res.status(200).json({ message: 'Đổi mật khẩu thành công' });
  } catch (error) {
    console.error('Lỗi khi đổi mật khẩu:', error);
    res.status(500).json({ message: 'Lỗi khi đổi mật khẩu', error });
  }
};

// Hàm gửi email
const sendEmail = async (email, newPassword) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Dịch vụ email (Gmail trong trường hợp này)
    auth: {
      user: 'nguyentientai280403@gmail.com', // Thay bằng email của bạn
      pass: 'pail albd mhjp nsmp', // Thay bằng mật khẩu ứng dụng của bạn
    },
  });

  const mailOptions = {
    from: 'nguyentientai280403@gmail.com', // Địa chỉ gửi email
    to: email, // Địa chỉ nhận email
    subject: 'Mật khẩu mới của bạn', // Tiêu đề email
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 20px;">
          <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #fff; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="background-color: #4C3FB4; color: #fff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="margin: 0;">Mật khẩu mới của bạn</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <p style="font-size: 16px; line-height: 1.5;">Chào bạn,</p>
                <p style="font-size: 16px; line-height: 1.5;">Chúng tôi đã nhận được yêu cầu đổi mật khẩu cho tài khoản của bạn. Mật khẩu mới của bạn là:</p>
                <p style="font-size: 18px; font-weight: bold; text-align: center; color: #4C3FB4;">${newPassword}</p>
                <p style="font-size: 14px; color: #555; line-height: 1.5;">Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>
                <p style="font-size: 14px; color: #555;">Trân trọng,<br>Đội ngũ hỗ trợ của chúng tôi</p>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `, // Nội dung HTML đẹp
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email đã được gửi thành công!');
  } catch (error) {
    console.error('Lỗi khi gửi email:', error);
  }
};

// Hàm quên mật khẩu
exports.forgotPassword = async (req, res) => {
  const { email } = req.body; // Lấy email từ yêu cầu

  try {
    // Tìm người dùng trong cơ sở dữ liệu bằng email (tenDangNhap là email)
    const user = await UserModel.findOne({ tenDangNhap: email }); // tenDangNhap là email
    if (!user) {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy người dùng với email này' });
    }

    // Tạo mật khẩu mới ngẫu nhiên
    const newPassword = Math.random().toString(36).slice(-8); // Mật khẩu ngẫu nhiên (8 ký tự)

    // Cập nhật mật khẩu mới vào cơ sở dữ liệu
    user.matKhau = newPassword;
    await user.save();

    // Gửi email với mật khẩu mới
    await sendEmail(email, newPassword);

    res.status(200).json({ message: 'Mật khẩu mới đã được gửi qua email!' });
  } catch (error) {
    console.error('Lỗi khi quên mật khẩu:', error);
    res.status(500).json({ message: 'Lỗi khi quên mật khẩu', error });
  }
};
