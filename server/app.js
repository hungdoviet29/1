var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

require('./models/db'); // Import kết nối cơ sở dữ liệu

// Import các route
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var laptopRouter = require('./routes/laptop_router');
var donHangRouter = require('./routes/donhang_router'); // Route đơn hàng
var cartRouter = require('./routes/cart_router');
const favoriteRouter = require('./routes/users');

var app = express();

// Sử dụng middleware CORS
app.use(cors()); // Cho phép tất cả các nguồn gốc truy cập vào API

// Thiết lập view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(laptopRouter);
app.use('/', favoriteRouter);// Kiểm tra trạng thái server
app.get('/health-check', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running.' });
});

// Middleware log toàn bộ request
app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}, Method: ${req.method}`);
    next();
});

app.get('/manager/products', (req, res) => {
    res.render('manager_laptops'); // Render file manager_laptops.ejs
});
app.get('/manager/users', (req, res) => {
    res.render('manager_user'); // Render file manager_user.ejs
});
app.get('/manager/discount', (req, res) => {
    res.render('manager_discount'); // Render file manager_user.ejs
});
app.get('/manager/statistical', (req, res) => {
    res.render('manager_statistical'); // Render file manager_user.ejs
});
app.get('/login', (req, res) => {
    res.render('login'); // Render file login.ejs
});
app.get('/logout', (req, res) => {
    res.clearCookie('token'); // Xóa cookie lưu trữ phiên đăng nhập, nếu có
    res.redirect('/login');   // Chuyển hướng về màn hình đăng nhập
});
// Health Check Endpoint
app.get('/health-check', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running.' });
});

// Route xử lý thông tin thanh toán (checkout)
app.get('/donhang/:userId', (req, res) => {
    const userId = req.params.userId;
    res.json({
        message: `Đơn hàng của người dùng ${userId}`,
        // Trả lại dữ liệu thực tế nếu có
    });
});

// Xác định route cho endpoint /donhang
app.get('/donhang/:userId', (req, res) => {
    const userId = req.params.userId;
    // Lấy đơn hàng từ cơ sở dữ liệu hoặc xử lý yêu cầu
    res.json({
        message: `Đơn hàng của người dùng ${userId}`,
        // Trả lại dữ liệu thực tế ở đây
    });
});

// Sử dụng các route
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/laptop', laptopRouter);
app.use('/laptops', laptopRouter);
app.use('/donhang', donHangRouter); // Sử dụng route đơn hàng
app.use('/cart', cartRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware xử lý 404 (Không tìm thấy route)
app.use((req, res, next) => {
    next(createError(404));
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
    // Thiết lập locals, chỉ cung cấp lỗi trong môi trường phát triển
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Ghi log lỗi vào console
    console.error('Error occurred:', err);

    // Render trang lỗi
    res.status(err.status || 500);
    res.render('error');
});

// Xuất module app
module.exports = app;
