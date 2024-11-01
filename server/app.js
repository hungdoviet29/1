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
// var gioHangRouter = require('./routes/giohang_router'); // Import route giỏ hàng

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
// app.use('/giohang', gioHangRouter); // Sử dụng route giỏ hàng

// Xử lý lỗi 404 và chuyển tiếp đến error handler
app.use(function(req, res, next) {
    next(createError(404));
});

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

// Cải thiện route giỏ hàng với kiểm tra và phản hồi tốt hơn
// gioHangRouter.put('/:id', async (req, res) => {
//     const { quantity } = req.body;
//     const { id } = req.params;

//     // Kiểm tra xem quantity có hợp lệ không
//     if (typeof quantity !== 'number' || quantity <= 0) {
//         return res.status(400).json({ message: 'Invalid quantity value.' });
//     }

//     try {
//         const updatedItem = await ItemModel.findByIdAndUpdate(id, { quantity }, { new: true });
//         if (!updatedItem) {
//             return res.status(404).json({ message: 'Item not found' });
//         }
//         res.status(200).json(updatedItem);
//     } catch (error) {
//         console.error('Error updating item:', error);
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// });

module.exports = app;
