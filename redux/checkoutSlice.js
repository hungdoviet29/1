import { createSlice } from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        totalAmount: 0,
    },
    reducers: {
        setTotalAmount: (state, action) => {
            state.totalAmount = action.payload;
        },
    },
});

export const { setTotalAmount } = checkoutSlice.actions;
export default checkoutSlice.reducer;
