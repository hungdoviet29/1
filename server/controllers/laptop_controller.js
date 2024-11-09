const { laptopModel } = require('../models/laptop_model');

// Lấy danh sách sản phẩm theo danh mục
exports.getCategoryLaptop = async (req, res, next) => {
    const category = req.params.category; // Nhận danh mục từ URL

    try {
        // Lọc sản phẩm theo danh mục
        let categoryLaptop = await laptopModel.find({ danhMuc: category });

        if (categoryLaptop.length === 0) {
            return res.status(404).json({ message: 'Không có sản phẩm trong danh mục này' });
        }

        res.status(200).json({ status: 200, data: categoryLaptop });
    } catch (error) {
        res.status(500).json({ status: "lỗi", result: error.message });
    }
};

// Các API khác (getListLaptop, addLaptop, updateLaptop, deleteLaptop, etc.)
exports.getListlaptop = async (req, res, next) => {
    try {
        let listlaptop = await laptopModel.find({});
        res.status(200).json({ status: 200, data: listlaptop });
    } catch (error) {
        res.status(500).json({ status: "lỗi", result: error.message });
    }
};

// Thêm các hàm xử lý API cho từng danh mục
exports.getPopularLapTop = async (req, res) => {
    try {
      // Giả sử bạn muốn lấy các sản phẩm nổi bật (Popular) từ MongoDB
      let popularLaptops = await laptopModel.find({ danhMuc: 'Popular' });
      res.status(200).json({ status: 200, data: popularLaptops });
    } catch (error) {
      res.status(500).json({ status: "lỗi", result: error.message });
    }
  };
  
  exports.getTrendingLapTop = async (req, res) => {
    try {
      let trendingLaptops = await laptopModel.find({ danhMuc: 'Trending' });
      res.status(200).json({ status: 200, data: trendingLaptops });
    } catch (error) {
      res.status(500).json({ status: "lỗi", result: error.message });
    }
  };
  
  exports.getNewsLapTop = async (req, res) => {
    try {
      let newsLaptops = await laptopModel.find({ danhMuc: 'News' });
      res.status(200).json({ status: 200, data: newsLaptops });
    } catch (error) {
      res.status(500).json({ status: "lỗi", result: error.message });
    }
  };
  
  exports.getSaleLapTop = async (req, res) => {
    try {
      let saleLaptops = await laptopModel.find({ danhMuc: 'Sale' });
      res.status(200).json({ status: 200, data: saleLaptops });
    } catch (error) {
      res.status(500).json({ status: "lỗi", result: error.message });
    }
  };
  

exports.addlaptop = async (req, res, next) => {
    try {
        const { file } = req;
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;

        const data = req.body;
        const newlaptop = new laptopModel({
            id: data.id,
            ten: data.ten,
            moTa: data.moTa,
            gia: data.gia,
            hinhAnh: imageUrl,
            danhMuc: data.danhMuc,
            soLuongTonKho: data.soLuongTonKho,
            danhGia: data.danhGia,
            cpu: data.cpu,
            ram: data.ram,
            cardDoHoa: data.cardDoHoa,
            trongLuong: data.trongLuong,
            thoiLuongPin: data.thoiLuongPin,
            khoangGia: data.khoangGia,
        });
        
        const savelaptop = await newlaptop.save();
        res.status(201).json(savelaptop);
    } catch (error) {
        res.json({ status: "lỗi", result: error });
    }
};

exports.updatelaptop = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { file } = req;
        
        if (!file) {
            return res.status(400).json({ message: 'Không có tệp được gửi' });
        }
        
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
        const data = req.body;

        const updatelaptop = {
            id: data.id,
            ten: data.ten,
            moTa: data.moTa,
            gia: data.gia,
            hinhAnh: imageUrl,
            danhMuc: data.danhMuc,
            soLuongTonKho: data.soLuongTonKho,
            danhGia: data.danhGia,
            cpu: data.cpu,
            ram: data.ram,
            cardDoHoa: data.cardDoHoa,
            trongLuong: data.trongLuong,
            thoiLuongPin: data.thoiLuongPin,
            khoangGia: data.khoangGia,
        };

        let result = await laptopModel.findByIdAndUpdate(id, updatelaptop, { new: true });

        if (result) {
            return res.status(200).json({
                status: 200,
                message: "Cập nhật laptop thành công",
                data: result,
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: "Không thể cập nhật laptop",
                data: [],
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Lỗi server", result: error });
    }
};

exports.deletelaptop = async (req, res) => {
    try {
        const deletedlaptop = await laptopModel.findByIdAndDelete(req.params.id);
        if (!deletedlaptop) {
            return res.status(404).json({ message: 'Không tìm thấy' });
        }
        res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getlaptopById = async (req, res, next) => {
    try {
        const laptop = await laptopModel.findById(req.params.id);
       
        if (!laptop) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        
        res.status(200).json({ status: 200, data: laptop });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Lỗi server", result: error });
    }
};
