import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { setProducts } = productSlice.actions

export default productSlice.reducer