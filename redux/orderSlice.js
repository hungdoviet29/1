// import { createSlice } from '@reduxjs/toolkit';

// const orderSlice = createSlice({
//     name: 'order',
//     initialState: {
//         orders: [], // Danh sách đơn hàng
//     },
//     reducers: {
//         // Action để thêm đơn hàng
//         addOrder(state, action) {
//             state.orders.push(action.payload); // Thêm đơn hàng vào danh sách
//         },
//         // Action để tải đơn hàng (có thể từ một nguồn tĩnh)
//         loadOrders(state, action) {
//             state.orders = action.payload; // Tải danh sách đơn hàng
//         },
//     },
// });

// // Xuất actions
// export const { addOrder, loadOrders } = orderSlice.actions;

// // Xuất selector
// export const selectOrders = (state) => state.order.orders;

// export default orderSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [], // Danh sách đơn hàng
    },
    reducers: {
        // Action để thêm đơn hàng
        addOrder(state, action) {
            // Kiểm tra nếu đơn hàng đã tồn tại hay chưa, nếu có thể không thêm
            const existingOrder = state.orders.find(order => order.id === action.payload.id);
            if (!existingOrder) {
                state.orders.push(action.payload); // Thêm đơn hàng vào danh sách
            }
        },
        // Action để tải danh sách đơn hàng
        loadOrders(state, action) {
            state.orders = action.payload; // Tải danh sách đơn hàng từ payload
        },
        // Action để cập nhật trạng thái đơn hàng (nếu cần)
        updateOrderStatus(state, action) {
            const { id, status } = action.payload;
            const existingOrder = state.orders.find(order => order.id === id);
            if (existingOrder) {
                existingOrder.status = status; // Cập nhật trạng thái của đơn hàng
            }
        },
        // Action để xóa đơn hàng
        removeOrder(state, action) {
            const idToRemove = action.payload;
            state.orders = state.orders.filter(order => order.id !== idToRemove); // Xóa đơn hàng theo ID
        },
    },
});

// Xuất actions
export const { addOrder, loadOrders, updateOrderStatus, removeOrder } = orderSlice.actions;

// Xuất selector
export const selectOrders = (state) => state.order.orders;

export default orderSlice.reducer;
