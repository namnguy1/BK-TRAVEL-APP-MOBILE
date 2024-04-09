import { configureStore } from '@reduxjs/toolkit'
// import basketSlice from './slices/basketSlice'
// import resturantSlice from './slices/resturantSlice'
import authSlice from './slices/authSlice'
export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
})