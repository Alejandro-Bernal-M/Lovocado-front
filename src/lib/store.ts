import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import productsSlice from './features/products/productsSlice'
import categoriesSlice from './features/categories/categoriesSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
      products : productsSlice.reducer,
      categories: categoriesSlice.reducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']