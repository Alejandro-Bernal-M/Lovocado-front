import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, ProductType } from '../../types';

const initialState: CartState = {
  items: [],
  totalProducts: 0,
  totalPrices: 0,
  showCart: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductType>) => {
      console.log('adding to cart from slice', action.payload);
      if (action.payload._id) {
        let price, offer;
        if (action.payload.offer) {
          price = action.payload.price - (action.payload.price * action.payload.offer) / 100;
          offer = action.payload.offer;
        } else {
          price = action.payload.price;
          offer = 0;
        }
        let item = state.items.find(item => item._id === action.payload._id);
        if (item) {
          item.quantity = item.quantity + action.payload.quantity;
        } else {
          state.items.push({
            _id: action.payload._id,
            quantity: action.payload.quantity,
            offer: offer,
            price: price
          });
        }
        state.totalProducts = state.items.length;
        state.totalPrices = state.totalPrices + (action.payload.price * action.payload.quantity);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      let item = state.items.find(item => item._id === action.payload);
      if (item) {
        state.totalProducts = state.totalProducts - item.quantity;
        state.totalPrices = state.totalPrices - (item.price * item.quantity);
        state.items = state.items.filter(item => item._id !== action.payload);
      }
    },
    clearCart: state => {
      state.items = [];
      state.totalPrices = 0;
      state.totalProducts = 0;
    },
    displayCart: state => {
      state.showCart = true;
    },
    hideCart: state => {
      state.showCart = false;
    }
  }
});

export const { addItem, removeItem, clearCart, displayCart, hideCart } = cartSlice.actions;

export default cartSlice.reducer;