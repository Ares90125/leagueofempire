import { createSlice } from '@reduxjs/toolkit';
import Web3 from 'web3';

import { CURRENT_NETWORK } from "@config/networks";
import { setAuthToken } from "@services/api";

const initialState = {
    web3: new Web3(new Web3.providers.HttpProvider(CURRENT_NETWORK["rpcUrls"][0])),
    username: '',
    email: '',
    wallet_address: '',
    role: ''
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredential: (state, { payload: { username, email, wallet_address, role, token } }) => {
            state.username = username;
            state.email = email;
            state.wallet_address = wallet_address;
            state.role = role;

            setAuthToken(token);
        },
        destoryCredential: (state) => {
            state.username = initialState.username;
            state.email = initialState.email;
            state.wallet_address = initialState.wallet_address;
            state.role = initialState.role;

            localStorage.removeItem('jwtToken');
        },
        setWeb3: (state, { payload: { web3 } }) => {
            state.web3 = web3;
        },
        destoryWeb3: (state) => {
            state.web3 = initialState.web3;
        }
    },
});

export const { setWeb3, destoryWeb3, setCredential, destoryCredential } = authSlice.actions;
export default authSlice.reducer;