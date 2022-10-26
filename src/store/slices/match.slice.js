import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: []
};

export const matchSlice = createSlice({
    name: 'match',
    initialState,
    reducers: {
        setMatchList: (state, { payload: { list } }) => {
            state.list = list;
        },
        initClaimedMatches: (state, { payload: { matchIDs } }) => {
            let matches = [ ...state.list ];
            matches = matches.map(match => {
                if (matchIDs.includes(match._id)) {
                    match.claimableToken = 0;

                    return match;
                }
                return match;
            });
            state.list = matches;
        }
    },
});

export const { setMatchList, initClaimedMatches } = matchSlice.actions;
export default matchSlice.reducer;