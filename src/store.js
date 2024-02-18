import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slicers/productSlice'
import filterReducer from './slicers/filterSlice'
import cardReducer from './slicers/cartSlice'
export default configureStore({
  reducer: {
    product: productReducer,
    filter: filterReducer,
    cart: cardReducer
    },
})