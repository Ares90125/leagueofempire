import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nfts: [],
    myItems: []
};

export const marketplaceSlice = createSlice({
    name: 'marketplace',
    initialState,
    reducers: {
        setNFTs: (state, { payload: { nfts } }) => {
            state.nfts = nfts;
        },
        setMyItems: (state, { payload: { items } }) => {
            state.myItems = items;
        }
    },
});

export const { setNFTs, setMyItems } = marketplaceSlice.actions;
export default marketplaceSlice.reducer;