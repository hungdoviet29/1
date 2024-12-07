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
  

  exports.addlaptop = async (req, res) => {
    try {
      console.log('Body:', req.body);
  
      const { ten, moTa, gia, danhMuc, soLuong, hang ,hinhAnh , CPU, RAM, CardManHinh, KichThuocManHinh} = req.body;
  
      if (!hinhAnh) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đường dẫn hình ảnh' });
      }
  
      const newLaptop = new laptopModel({
        ten,
        moTa,
        gia: Number(gia),
        hinhAnh,
        danhMuc,
        soLuong: Number(soLuong),
        hang,
        CPU,
        RAM,
CardManHinh,
        KichThuocManHinh
      });
  
      const savedLaptop = await newLaptop.save();
      console.log('Lưu vào MongoDB thành công:', savedLaptop);
  
      res.status(201).json({ message: 'Sản phẩm đã được thêm thành công!', data: savedLaptop });
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
      res.status(500).json({ message: 'Không thể thêm sản phẩm', error: error.message });
    }
  };
  

  exports.updatelaptop = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { hinhAnh, ten, moTa, gia, danhMuc, soLuong, hang, CPU, RAM, CardManHinh, KichThuocManHinh } = req.body;
  
      // Kiểm tra nếu không có `hinhAnh` trong request body
      if (!hinhAnh) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đường dẫn hình ảnh' });
      }
  
      const updatelaptop = {
        ten,
        moTa,
        gia: Number(gia),
        hinhAnh, // Sử dụng link ảnh từ request body
        danhMuc,
        soLuong: Number(soLuong),
        hang,
        CPU,
        RAM,
        CardManHinh,
        KichThuocManHinh
      };
  
      const result = await laptopModel.findByIdAndUpdate(id, updatelaptop, { new: true });
  
      if (result) {
        return res.status(200).json({
          status: 200,
          message: 'Cập nhật laptop thành công',
          data: result,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: 'Không thể cập nhật laptop',
          data: [],
        });
      }
    } catch (error) {
      console.error('Lỗi server:', error);
      res.status(500).json({ message: 'Lỗi server', result: error });
    }
  };
  
exports.deletelaptop = async (req, res) => {
  try {
      console.log('Deleting laptop with ID:', req.params.id);  // Thêm log để kiểm tra ID
      const deletedlaptop = await laptopModel.findByIdAndDelete(req.params.id);
      if (!deletedlaptop) {
          return res.status(404).json({ message: 'Không tìm thấy sản phẩm với ID này' });
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
exports.getLaptopsByBrand = async (req, res) => {
  const brand = req.params.brand;

  try {
      const brandLaptops = await laptopModel.find({ hang: brand });
      if (brandLaptops.length === 0) {
return res.status(404).json({ message: 'Không có sản phẩm nào thuộc hãng này' });
      }

      res.status(200).json({ status: 200, data: brandLaptops });
  } catch (error) {
      res.status(500).json({ status: "lỗi", result: error.message });
  }
};