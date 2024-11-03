// notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload); // Thêm thông báo mới vào danh sách
    },
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
