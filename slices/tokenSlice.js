// slices/tokenSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    user_id: Number,
    facebookAccessToken: String,
    userId: String,
    email: String,
    firstName: String,
    lastName: String,

};

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setUserId: (state, action) => {
            state.user_id = action.payload;
        },
        setFacebookAccessToken: (state, action) => {
            state.facebookAccessToken = action.payload;
            state.userId = action.payload.userId;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
    },
});

export const { setAccessToken, setFacebookAccessToken, setFacebookUserInfo, setUserId } = tokenSlice.actions;
export default tokenSlice.reducer;