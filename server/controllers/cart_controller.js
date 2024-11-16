const mongoose = require('mongoose');
const { CartModel } = require('../models/cart_model');
const { laptopModel } = require('../models/laptop_model');

// Lấy giỏ hàng của người dùng
exports.getCart = async (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'ID người dùng không hợp lệ' });
  }

  try {
    let cart = await CartModel.findOne({ userId }).populate(
      'items.productId',
      'ten moTa gia hinhAnh danhMuc'
    );

    if (!cart) {
      // Tạo giỏ hàng mặc định nếu chưa có
      cart = new CartModel({ userId, items: [] });
      await cart.save();
      console.log('Tạo giỏ hàng mặc định cho người dùng.');
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Lỗi khi lấy giỏ hàng:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const product = await laptopModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      cart = new CartModel({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Lỗi khi thêm vào giỏ hàng:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    res.status(200).json({ message: 'Xóa sản phẩm thành công', cart });
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

exports.updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || quantity < 1) {
    return res.status(400).json({ message: 'Invalid request. Provide userId, productId, and valid quantity.' });
  }

  try {
    // Find the user's cart and populate product details
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();

      // Re-fetch and populate cart to ensure product details are included
      const updatedCart = await CartModel.findOne({ userId }).populate(
        'items.productId',
        'ten moTa gia hinhAnh danhMuc'
      );
      return res.status(200).json({ message: 'Quantity updated successfully', cart: updatedCart });
    }

    return res.status(404).json({ message: 'Product not found in cart' });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};


// Xóa toàn bộ giỏ hàng
exports.clearCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: 'Xóa toàn bộ giỏ hàng thành công', cart });
  } catch (error) {
    console.error('Lỗi khi xóa toàn bộ giỏ hàng:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};
