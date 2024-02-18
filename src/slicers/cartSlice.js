import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCarts: (state, action) => {
      return action.payload
    },
    addToCart: (state, action) => {
            const { price,name } = action.payload;
            const itemIndex = state.findIndex((item) => item.name === name);
            if (itemIndex >= 0) {
                state[itemIndex].amount += 1;
                return
            }
            const newItem = {
                amount: 1,
                price: price,
                name: name
            };
            return [...state, newItem];
        },
    removeFromCart: (state, action) => {
        const {name} = action.payload;
        const itemIndex = state.findIndex((item) => item.name === name);
        if (state[itemIndex].amount > 1) {
            state[itemIndex].amount -= 1;
            return
        }
        else if (state[itemIndex].amount === 1) {
            state = state.filter((item) => item.name !== name);
            return state
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCarts,addToCart,removeFromCart } = cartSlice.actions

export default cartSlice.reducer