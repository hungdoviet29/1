import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Giỏ hàng sẽ chứa items cho tất cả người dùng
    userId: null, // Lưu trữ userId của người dùng hiện tại
    totalAmount: 0, // Tổng giá trị giỏ hàng
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload; // Lưu trữ userId
        },
        
        // Reset giỏ hàng của người dùng
        resetCart: (state) => {
            if (state.userId) {
                state.items = []; // Reset giỏ hàng của người dùng
                state.totalAmount = 0; // Reset tổng tiền
            }
        },

        // Thêm sản phẩm vào giỏ hàng
        addToCart: (state, action) => {
            if (state.userId) {
                const existingItem = state.items.find(item => item.productId._id === action.payload.productId._id);
                if (existingItem) {
                    // Nếu sản phẩm đã có trong giỏ hàng, chỉ cần tăng số lượng
                    existingItem.quantity += action.payload.quantity;
                } else {
                    // Nếu chưa có trong giỏ hàng, thêm mới vào giỏ
                    state.items.push(action.payload);
                }
                // Cập nhật tổng tiền
                state.totalAmount = state.items.reduce((sum, item) => {
                    if (item.productId?.gia && item.quantity) {
                        return sum + item.productId.gia * item.quantity;
                    }
                    return sum;
                }, 0);
            }
        },

        // Xóa sản phẩm khỏi giỏ hàng
        removeFromCart: (state, action) => {
            if (state.userId) {
                state.items = state.items.filter(item => item.productId._id !== action.payload);
                // Cập nhật lại tổng tiền sau khi xóa sản phẩm
                state.totalAmount = state.items.reduce((sum, item) => {
                    if (item.productId?.gia && item.quantity) {
                        return sum + item.productId.gia * item.quantity;
                    }
                    return sum;
                }, 0);
            }
        },

        // Cập nhật số lượng sản phẩm trong giỏ
        updateItemQuantity: (state, action) => {
            if (state.userId) {
                const item = state.items.find(item => item.productId._id === action.payload.productId._id);
                if (item) {
                    item.quantity = action.payload.quantity; // Cập nhật số lượng
                }
                // Cập nhật lại tổng tiền
                state.totalAmount = state.items.reduce((sum, item) => {
                    if (item.productId?.gia && item.quantity) {
                        return sum + item.productId.gia * item.quantity;
                    }
                    return sum;
                }, 0);
            }
        },

        // Tải giỏ hàng từ server cho người dùng
        loadCart: (state, action) => {
            if (state.userId) {
                state.items = action.payload.items || []; // Giả sử payload trả về có field items
                // Cập nhật lại tổng tiền
                state.totalAmount = state.items.reduce((sum, item) => {
                    if (item.productId?.gia && item.quantity) {
                        return sum + item.productId.gia * item.quantity;
                    }
                    return sum;
                }, 0);
            }
        },
    },
});

// Export các action để sử dụng trong component
export const { setUserId, resetCart, addToCart, removeFromCart, updateItemQuantity, loadCart } = cartSlice.actions;

export default cartSlice.reducer;
