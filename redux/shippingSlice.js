import { createSlice } from '@reduxjs/toolkit';

const shippingSlice = createSlice({
    name: 'shipping',
    initialState: {
        shippingInfo: {},
    },
    reducers: {
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
        },
    },
});

export const { saveShippingInfo } = shippingSlice.actions;
export default shippingSlice.reducer;
