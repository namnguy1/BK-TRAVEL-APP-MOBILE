// Redux slice hoặc action (ví dụ: authSlice.js)
import { createSlice } from '@reduxjs/toolkit';

export const reloadPageAfterClick = createSlice({
    name: 'reloadPageAfterClick',
    initialState: {
        reloadPageAfterClick: false,
    },
    reducers: {
        setReloadPageAfterClick: (state, action) => {
            console.log(state);
            state.reloadPageAfterClick = action.payload;
        },
    },
});

export const { setReloadPageAfterClick } = reloadPageAfterClick.actions;

export const selectReloadPageAfterClick = state => state.reloadPageAfterClick.reloadPageAfterClick;



export default reloadPageAfterClick.reducer;
