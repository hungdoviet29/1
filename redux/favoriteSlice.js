// favoriteSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadFavorites, saveFavorites } from '../utils/storage'; // Import hàm load và save từ storage

const initialState = {
  favorites: [],
};

// Thunk để tải danh sách yêu thích từ AsyncStorage khi ứng dụng khởi động
export const loadFavoriteItems = createAsyncThunk('favorites/loadFavorites', async () => {
  return await loadFavorites(); // Gọi hàm load từ AsyncStorage
});

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const existingItem = state.favorites.find(item => item._id === action.payload._id);
      if (!existingItem) {
        state.favorites.push(action.payload);
        saveFavorites(state.favorites); // Lưu danh sách yêu thích vào AsyncStorage sau khi thêm sản phẩm
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(item => item._id !== action.payload);
      saveFavorites(state.favorites); // Lưu lại danh sách yêu thích vào AsyncStorage sau khi xóa sản phẩm
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFavoriteItems.fulfilled, (state, action) => {
      state.favorites = action.payload; // Cập nhật danh sách yêu thích từ AsyncStorage khi ứng dụng khởi động
    });
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
