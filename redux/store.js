import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './actions/cartSlicer';
import headerReducer from './actions/headerSlicer';

export default configureStore({
    reducer: {
        cart: cartReducer,
        header: headerReducer,
    },
});
