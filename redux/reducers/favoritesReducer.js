// favoritesReducer.js
const initialState = {
    favorites: [],
};

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REMOVE_FROM_FAVORITES':
            return {
                ...state,
                favorites: state.favorites.filter(item => item._id !== action.payload),
            };
        // Các case khác...
        default:
            return state;
    }
};

export default favoritesReducer;
