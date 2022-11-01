import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { dashboardReducers } from './actions/dashboardSlicer';
import { searchReducers } from './actions/searchSlicer';
import cartReducer from './actions/cartSlicer';
import headerReducer from './actions/headerSlicer';
import sizeReducer from './actions/sizeSlicer';
import authentication from './actions/authentication';

const reducers = combineReducers({
    auth: authentication,
    header: headerReducer,
    carts: cartReducer,
    header: headerReducer,
    size: sizeReducer,
    dashboard: dashboardReducers,
    search: searchReducers,
});

const store = configureStore({
    reducer: reducers,
});

export default store;
