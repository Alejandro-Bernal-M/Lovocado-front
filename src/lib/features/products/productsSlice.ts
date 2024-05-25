import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiEndPoints from "../../../utils/routes";
import { signOut } from "../user/userSlice";
import { ProductType } from "../../types";

const initialState = {
  products: [] as ProductType[],
  loading: false,
  error: null as any,
};

const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const response = await fetch(apiEndPoints.getAllProducts);
    return response.json();
  }
);

const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id: string) => {
    const response = await fetch(`${apiEndPoints.getProduct}/${id}`);
    return response.json();
  }
);

const createProduct  = createAsyncThunk(
  "products/createProduct",
  async (data : any, { dispatch }) => {
    const product = data.product;
    const token = data.token;
    try {
      console.log('product client', product);
      const response: any = await fetch(apiEndPoints.createProduct, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: product,
      });
      if (response.status == 400) {
        console.log('Please sign in to create a product')
        dispatch(signOut());
        window.location.href = '/';
        return 
      }
      console.log('response', response)
      dispatch(getAllProducts());
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
)

const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    try {
      const response = await fetch(apiEndPoints.updateProduct, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
)

const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string) => {
    try {
      const response = await fetch(`${apiEndPoints.deleteProduct}/${id}`, {
        method: "DELETE",
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      console.log('action.payload', action.payload)
      state.loading = false;
      state.products = action.payload.products;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.savedProduct;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct };
export default productsSlice;