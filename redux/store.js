import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from './actions/cartSlicer';
import headerReducer from './actions/headerSlicer';
import sizeReducer from './actions/sizeSlicer';
import authentication from "./actions/authentication";

const reducers = combineReducers({
  auth: authentication,
  header: headerReducer,
  cart: cartReducer,
  header: headerReducer,
  size: sizeReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
