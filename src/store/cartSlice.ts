import { createSlice } from '@reduxjs/toolkit';
import { CartType } from 'types';

interface CartState {
  cart: CartType[];
}

const initialState: CartState = {
  cart: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { setCart } = CartSlice.actions;

export default CartSlice.reducer;
