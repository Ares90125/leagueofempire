import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    winToken: null
};

export const attributeSlice = createSlice({
    name: 'attribute',
    initialState,
    reducers: {
        setAttributes: (state, { payload: { winToken } }) => {
            state.winToken = winToken;
        },
        updateAttributes: (state, { payload: { winToken } }) => {
            state.winToken = winToken;
        }
    },
});

export const { setAttributes, updateAttributes } = attributeSlice.actions;
export default attributeSlice.reducer;