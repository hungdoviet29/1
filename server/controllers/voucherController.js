const Voucher = require('../models/voucher');


// Lấy tất cả danh sách voucher
const getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find(); // Lấy tất cả voucher trong cơ sở dữ liệu
    return res.status(200).json(vouchers);
  } catch (error) {
    console.error('Error fetching all vouchers:', error);
    return res.status(500).json({message: 'Lỗi khi lấy tất cả danh sách voucher', error});
  }
};


// Tạo mới voucher
const createVoucherByUser = async (req, res) => {
  try {
    const {
      userId,
      type,
      title,
      description,
      startDate,
      expirationDate,
      isActive,
      quantity,
    } = req.body;

    // Kiểm tra nếu thiếu bất kỳ trường nào
    if (
      !userId ||
      !type ||
      !title ||
      !description ||
      !startDate ||
      !expirationDate ||
      !quantity
    ) {
      return res.status(400).json({
        message:
          'Thiếu thông tin cần thiết. Vui lòng cung cấp đầy đủ thông tin: userId, type, title, description, startDate, expirationDate, quantity.',
      });
    }

    // Chuyển đổi startDate và expirationDate sang kiểu Date nếu chúng là chuỗi
    const parsedStartDate = new Date(startDate);
    const parsedExpirationDate = new Date(expirationDate);

    // Kiểm tra nếu startDate và expirationDate không hợp lệ
    if (
      isNaN(parsedStartDate.getTime()) ||
      isNaN(parsedExpirationDate.getTime())
    ) {
      return res
        .status(400)
        .json({message: 'Ngày bắt đầu hoặc ngày hết hạn không hợp lệ.'});
    }

    const newVoucher = new Voucher({
      userId,
      type,
      title,
      description,
      startDate: parsedStartDate,
      expirationDate: parsedExpirationDate,
      isActive,
      quantity,
    });

    const savedVoucher = await newVoucher.save();
    return res.status(201).json({
      message: 'Tạo voucher thành công',
      voucher: savedVoucher,
    });
  } catch (error) {
    console.error('Error creating voucher:', error);
    return res.status(500).json({message: 'Lỗi khi tạo voucher', error});
  }
};


// Lấy danh sách voucher theo userId
const getVouchersByUser = async (req, res) => {
  try {
    const {userId} = req.query;
    if (!userId) {
      return res.status(400).json({message: 'Thiếu userId'});
    }

    const vouchers = await Voucher.find({userId});
    return res.status(200).json(vouchers);
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    return res
      .status(500)
      .json({message: 'Lỗi khi lấy danh sách voucher', error});
  }
};

// Lấy chi tiết voucher theo ID và userId
const getVoucherByIdAndUser = async (req, res) => {
  try {
    const {id} = req.params;
    const {userId} = req.query;

    if (!userId) {
      return res.status(400).json({message: 'Thiếu userId'});
    }

    const voucher = await Voucher.findOne({_id: id, userId});
    if (!voucher) {
      return res
        .status(404)
        .json({message: 'Voucher không tồn tại hoặc không thuộc về user này'});
    }
    return res.status(200).json(voucher);
  } catch (error) {
    console.error('Error fetching voucher:', error);
    return res.status(500).json({message: 'Lỗi khi lấy voucher', error});
  }
};

// Cập nhật voucher theo ID và userId
const updateVoucherByUser = async (req, res) => {
  try {
    const {id} = req.params;
    const {userId} = req.body;

    const updatedVoucher = await Voucher.findOneAndUpdate(
      {_id: id, userId},
      req.body,
      {new: true},
    );

    if (!updatedVoucher) {
      return res
        .status(404)
        .json({message: 'Voucher không tồn tại hoặc không thuộc về user này'});
    }
    return res
      .status(200)
      .json({message: 'Cập nhật voucher thành công', voucher: updatedVoucher});
  } catch (error) {
    console.error('Error updating voucher:', error);
    return res.status(500).json({message: 'Lỗi khi cập nhật voucher', error});
  }
};

// Xóa voucher theo ID và userId
const deleteVoucherByUser = async (req, res) => {
  try {
    const {id} = req.params;
    const {userId} = req.body;

    const deletedVoucher = await Voucher.findOneAndDelete({_id: id, userId});
    if (!deletedVoucher) {
      return res
        .status(404)
        .json({message: 'Voucher không tồn tại hoặc không thuộc về user này'});
    }
    return res.status(200).json({message: 'Voucher đã bị xóa'});
  } catch (error) {
    console.error('Error deleting voucher:', error);
    return res.status(500).json({message: 'Lỗi khi xóa voucher', error});
  }
};

// Cập nhật số lượng voucher khi đã sử dụng
const useVoucher = async (req, res) => {
  try {
    const {voucherId} = req.body;

    // Tìm voucher trong cơ sở dữ liệu
    const voucher = await Voucher.findById(voucherId);
    if (!voucher) {
      return res.status(404).json({message: 'Voucher không tồn tại'});
    }

    if (voucher.quantity <= 0) {
      return res.status(400).json({message: 'Voucher này đã hết hạn sử dụng'});
    }

    // Giảm số lượng voucher đi 1
    voucher.quantity -= 1;
    const updatedVoucher = await voucher.save();

    return res.status(200).json({
      message: 'Voucher đã được sử dụng',
      voucher: updatedVoucher,
    });
  } catch (error) {
    console.error('Error using voucher:', error);
    return res.status(500).json({message: 'Lỗi khi sử dụng voucher', error});
  }
};

module.exports = {
  getAllVouchers,
  createVoucherByUser,
  getVouchersByUser,
  getVoucherByIdAndUser,
  updateVoucherByUser,
  deleteVoucherByUser,
  useVoucher, // Thêm phương thức useVoucher
};
