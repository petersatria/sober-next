import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './actions/cartSlicer';
import headerReducer from './actions/headerSlicer';
import sizeReducer from './actions/sizeSlicer';
import { dashboardReducers } from './actions/dashboardSlicer';
import authentication from './actions/authentication';

const reducers = combineReducers({
    auth: authentication,
    header: headerReducer,
    carts: cartReducer,
    header: headerReducer,
    size: sizeReducer,
    dashboard: dashboardReducers,
});

const store = configureStore({
    reducer: reducers,
});

export default store;
