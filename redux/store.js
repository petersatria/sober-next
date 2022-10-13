import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './actions/cartSlicer';
import headerReducer from './actions/headerSlicer';
import sizeReducer from './actions/sizeSlicer';

export default configureStore({
    reducer: {
        cart: cartReducer,
        header: headerReducer,
        size: sizeReducer,
    },
});
