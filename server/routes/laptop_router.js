const multer = require('multer');
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // Middleware xử lý upload
const LapTopCtl = require('../controllers/laptop_controller');
const LapTopModel = require('../models/laptop_model');


// Cấu hình multer để tải lên hình ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const Upload = multer({ storage: storage });

// Các route API
router.get("/getListLapTop", LapTopCtl.getListlaptop);
router.get("/getCategoryLapTop/:category", LapTopCtl.getCategoryLaptop); // Route lấy sản phẩm theo danh mục
router.post("/addLapTop", Upload.single('hinhAnh'), LapTopCtl.addlaptop);
router.put("/updateLapTop/:id", Upload.single('hinhAnh'), LapTopCtl.updatelaptop);
router.delete("/deleteLapTop/:id", LapTopCtl.deletelaptop);
router.get("/getLapTopById/:id", LapTopCtl.getlaptopById);
// Cập nhật router để xử lý các danh mục
router.get("/getPopularLapTop", LapTopCtl.getPopularLapTop);
router.get("/getTrendingLapTop", LapTopCtl.getTrendingLapTop);
router.get("/getNewsLapTop", LapTopCtl.getNewsLapTop);
router.get("/getSaleLapTop", LapTopCtl.getSaleLapTop);
router.get("/getListLapTop", LapTopCtl.getListlaptop);


module.exports = router;
