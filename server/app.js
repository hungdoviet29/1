var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Import các route
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var laptopRouter = require('./routes/laptop_router');
var donHangRouter = require('./routes/donhang_router'); // Import route đơn hàng
var cartRouter = require('./routes/cart_router');

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

// Sử dụng các route
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/laptop', laptopRouter);
app.use('/donhang', donHangRouter); // Sử dụng route đơn hàng
app.use('/cart', cartRouter);
// Error handler
app.use(function(err, req, res, next) {
    // Thiết lập locals, chỉ cung cấp lỗi trong môi trường phát triển
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Ghi log lỗi vào console
    console.error('Error occurred:', err);

    // Render trang lỗi
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
