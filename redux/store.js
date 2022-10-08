import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './actions/cartSlicer'

export default configureStore({
  reducer: {
    cart:cartReducer
  },
})