// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadCartItems, saveCartItems } from '../utils/storage'; // Import hàm load và save từ storage

const initialState = {
    items: [],
};

// Thunk để tải giỏ hàng từ AsyncStorage khi ứng dụng khởi động
export const loadCart = createAsyncThunk('cart/loadCart', async () => {
    return await loadCartItems(); // Gọi hàm load từ AsyncStorage
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push({ ...action.payload, quantity: action.payload.quantity });
            }
            saveCartItems(state.items); // Lưu giỏ hàng vào AsyncStorage sau khi cập nhật
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
            saveCartItems(state.items);
        },
        updateQuantity: (state, action) => {
            const item = state.items.find(item => item._id === action.payload.id);
            if (item && action.payload.quantity > 0) {
                item.quantity = action.payload.quantity;
                saveCartItems(state.items);
            }
        },
        resetCart: (state) => {
            state.items = []; // Reset giỏ hàng
            saveCartItems(state.items); // Lưu trạng thái trống vào AsyncStorage
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadCart.fulfilled, (state, action) => {
            state.items = action.payload; // Cập nhật giỏ hàng từ AsyncStorage khi ứng dụng khởi động
        });
    },
});

export const { addToCart, removeFromCart, updateQuantity, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
