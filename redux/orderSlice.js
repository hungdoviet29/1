import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [], // Danh sách đơn hàng
        selectedPaymentMethod: '', // Biến lưu giá trị phương thức thanh toán
    },
    reducers: {
        // Action để thêm đơn hàng
        addOrder(state, action) {
            const existingOrder = state.orders.find(order => order.id === action.payload.id);
            if (!existingOrder) {
                state.orders.push(action.payload);
            }
        },
        loadOrders(state, action) {
            state.orders = action.payload;
        },
        updateOrderStatus(state, action) {
            const { id, status } = action.payload;
            const existingOrder = state.orders.find(order => order.id === id);
            if (existingOrder) {
                existingOrder.status = status;
            }
        },
        removeOrder(state, action) {
            const idToRemove = action.payload;
            state.orders = state.orders.filter(order => order.id !== idToRemove);
        },
        setPaymentMethod(state, action) {
            state.selectedPaymentMethod = action.payload; // Cập nhật phương thức thanh toán đã chọn
        },
    },
});

// Xuất actions
export const { addOrder, loadOrders, updateOrderStatus, removeOrder, setPaymentMethod } = orderSlice.actions;

// Xuất selector
export const selectOrders = state => state.order.orders;
export const selectPaymentMethod = state => state.order.selectedPaymentMethod;

export default orderSlice.reducer;
