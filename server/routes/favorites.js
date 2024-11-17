const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    const { id } = req.params;
    // Xử lý logic tìm dữ liệu dựa trên ID
    // res.status(404).json({ message: 'Không tìm thấy mục yêu thích.' });
});

module.exports = router;
