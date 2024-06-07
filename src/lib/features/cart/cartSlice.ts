import { createSlice, PayloadAction, createAsyncThunk  } from '@reduxjs/toolkit';
import { CartState, ProductType, ProductCart, RemoveItem } from '../../types';
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
    return response.json();
  }
);

export const clearCartDB = createAsyncThunk(
  'cart/clearCartDB',
  async (token: string) => {
    const response = await fetch( apiEndPoints.clearCart , {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    return response.json();
  }
);

export const getCartItemsDB = createAsyncThunk(
  'cart/getCartItemsDB',
  async (token: string) => {
    const response = await fetch( apiEndPoints.getCartItems , {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    let data = await response.json();
    console.log('get cart items response', data)
    return data;
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
    removeItemQuantity: (state, action:PayloadAction<RemoveItem>) => {
      let item = state.items.find(item => item._id === action.payload._id);
      if (item) {
        item.quantity = item.quantity - action.payload.quantity;
        state.totalProducts = state.totalProducts - action.payload.quantity;
        state.totalPrices = state.totalPrices - (item.price * action.payload.quantity);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCartDB.fulfilled, (state, action) => {
        console.log('addItemToCartDB.fulfilled', action.payload);
      })
      .addCase(addItemToCartDB.rejected, (state, action) => {
        console.log('addItemToCartDB.rejected', action.error);
      })
      .addCase(clearCartDB.fulfilled, (state, action) => {
        console.log('clearCartDB.fulfilled', action.payload);
      })
      .addCase(clearCartDB.rejected, (state, action) => {
        console.log('clearCartDB.rejected', action.error);
      })
      .addCase(getCartItemsDB.fulfilled, (state, action) => {
        console.log('getCartItemsDB.fulfilled', action.payload);
        state.items = action.payload.cartItems;
        state.totalProducts = action.payload.cartItems.length;
        state.totalPrices = action.payload.cartItems.reduce((acc: number, item: ProductCart) => {
          return acc + (item.price * item.quantity);
        }
        , 0);
      })
      .addCase(getCartItemsDB.rejected, (state, action) => {
        console.log('getCartItemsDB.rejected', action.error);
      })
  }
});

export const { addItem, removeItem, clearCart, displayCart, hideCart, removeItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;