import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, ProductType } from '../../types';

const initialState: CartState = {
  items: [{ _id: '', quantity: 0, price: 0}],
  totalProducts: 0,
  totalPrices: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductType>) => {
      if (action.payload._id) {
        state.items.push({
          _id: action.payload._id,
          quantity: action.payload.quantity,
          price: action.payload.price
        });
        state.totalProducts = state.items.length;
        state.totalPrices = state.totalPrices + (action.payload.price * action.payload.quantity);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      let items = state.items.filter(item => item._id !== action.payload);
      if (items.length > 0) {
        state.items = items as [{_id: string, quantity: number, price: number}];
        state.totalProducts = items.length;
        state.totalPrices = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      } else {
        state.items = [{_id: '', quantity: 0, price: 0}];
        state.totalProducts = 0;
        state.totalPrices = 0;
      }
    },
    clearCart: state => {
      state.items = [{_id: '', quantity: 0, price: 0}];
      state.totalPrices = 0;
      state.totalProducts = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;