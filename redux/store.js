import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import notificationReducer from './notificationSlice';
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        order:orderReducer,
        notifications: notificationReducer,
    },
});

export default store;
