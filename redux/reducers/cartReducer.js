const initialState = {
    cartItems: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item._id === action.payload._id ? { ...item, quantity: item.quantity + action.payload.quantity } : item
                    ),
                };
            } else {
                return { ...state, cartItems: [...state.cartItems, { ...action.payload }] };
            }

        case 'INCREASE_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };

        case 'DECREASE_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item._id === action.payload && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
                ),
            };

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item._id !== action.payload),
            };

        default:
            return state;
    }
};

export default cartReducer;
