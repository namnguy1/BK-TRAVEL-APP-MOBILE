import { configureStore } from '@reduxjs/toolkit'
// import basketSlice from './slices/basketSlice'
// import resturantSlice from './slices/resturantSlice'
import authSlice from './slices/authSlice'
import tokenSlice from './slices/tokenSlice'
import reloadPageAfterClickReducer from './slices/reloadSlice'
export const store = configureStore({
  reducer: {
    auth: authSlice,
    // token: tokenSlice,
    reloadPageAfterClick: reloadPageAfterClickReducer,
  },
})