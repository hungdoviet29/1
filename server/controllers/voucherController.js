const Voucher = require('../models/voucher'); // Đảm bảo đường dẫn đúng tới mô hình voucher

// Tạo mới voucher
const createVoucher = async (req, res) => {
  try {
    const {type, title, description, expirationDate, isActive} = req.body;

    const newVoucher = new Voucher({
      type,
      title,
      description,
      expirationDate,
      isActive,
    });

    await newVoucher.save(); // Lưu voucher mới vào database
    res.status(201).json(newVoucher); // Trả về voucher vừa tạo
  } catch (error) {
    res.status(400).json({message: 'Lỗi khi tạo voucher', error});
  }
};

// Lấy danh sách tất cả các voucher
const getVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find(); // Lấy tất cả các voucher
    res.status(200).json(vouchers); // Trả về danh sách voucher
  } catch (error) {
    res.status(400).json({message: 'Lỗi khi lấy danh sách voucher', error});
  }
};

// Lấy chi tiết voucher theo ID
const getVoucherById = async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id); // Tìm voucher theo ID
    if (!voucher) {
      return res.status(404).json({message: 'Voucher không tồn tại'});
    }
    res.status(200).json(voucher); // Trả về voucher tìm thấy
  } catch (error) {
    res.status(400).json({message: 'Lỗi khi lấy voucher', error});
  }
};

// Cập nhật voucher theo ID
const updateVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // Cập nhật voucher và trả về thông tin mới
    if (!voucher) {
      return res.status(404).json({message: 'Voucher không tồn tại'});
    }
    res.status(200).json(voucher); // Trả về voucher sau khi cập nhật
  } catch (error) {
    res.status(400).json({message: 'Lỗi khi cập nhật voucher', error});
  }
};

// Xóa voucher theo ID
const deleteVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findByIdAndDelete(req.params.id); // Xóa voucher theo ID
    if (!voucher) {
      return res.status(404).json({message: 'Voucher không tồn tại'});
    }
    res.status(200).json({message: 'Voucher đã bị xóa'}); // Trả về thông báo xóa thành công
  } catch (error) {
    res.status(400).json({message: 'Lỗi khi xóa voucher', error});
  }
};

module.exports = {
  createVoucher,
  getVouchers,
  getVoucherById,
  updateVoucher,
  deleteVoucher,
};
