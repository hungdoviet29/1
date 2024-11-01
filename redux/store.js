import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import favoritesReducer from './favoriteSlice';
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        order:orderReducer,
        favorites: favoritesReducer,
    },
});

export default store;
