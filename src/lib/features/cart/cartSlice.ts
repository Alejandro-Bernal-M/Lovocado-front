import { createSlice, PayloadAction, createAsyncThunk  } from '@reduxjs/toolkit';
import { CartState, ProductType, ProductCart } from '../../types';
import apiEndPoints from '@/utils/routes';

const initialState: CartState = {
  items: [],
  totalProducts: 0,
  totalPrices: 0,
  showCart: false,
};

export const addItemToCartDB = createAsyncThunk(
  'cart/addItemToCartDB',
  async (info: {item: ProductCart, token: string}) => {
    const data = {
      cartItem: info.item,
    }
    const response = await fetch( apiEndPoints.addProductToCart , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${info.token}`
      },
      body: JSON.stringify(data),
    });
    console.log('response', response)
    return response.json();
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductType>) => {
      let price, offer;
      if (action.payload._id) {
        if (action.payload.offer) {
          offer = action.payload.offer;
          price = action.payload.price - (action.payload.price * action.payload.offer) / 100;
        } else {
          offer = 0;
          price = action.payload.price;
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
        state.totalPrices = state.totalPrices + (price * action.payload.quantity);
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