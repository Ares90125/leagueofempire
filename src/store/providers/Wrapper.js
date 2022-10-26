import { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import { Web3Context } from "@store/providers/Web3Provider";
import { getMatchList as getMatchListAPI } from "@services/match.service";
import { getGameAttributes } from "@services/admin/attribute.service";
import { setMatchList } from "@store/slices/match.slice";
import { setAttributes } from "@store/slices/attribute.slice";

export const WrapperContext = createContext();

export default function WrapperProvider({ children }) {
    const { isReady, connectWallet, disconnectWallet } = useContext(Web3Context);
    const auth = useSelector(state => state.auth);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const getMatchList = async () => {
        try {
            const response = await getMatchListAPI();
            if (!response.success)
                throw new Error(response.message);
            const list = response.list;
            dispatch(setMatchList({ list }));
        } catch (err) {
            console.log(err);
            enqueueSnackbar("Error occured!", { variant: 'error' });
        }
    }

    const getAttributes = async () => {
        try {
            const response = await getGameAttributes();
            if (!response.success)
                throw new Error(response.message);
            const attribute = response.attribute;
            dispatch(setAttributes(attribute));
        } catch (err) {
            console.log(err);
            enqueueSnackbar("Error occured!", { variant: 'error' });
        }
    }

    const identifyConnectWallet = async () => {
        try {
            if (!auth.username) {
                enqueueSnackbar("Please sign in!", { variant: 'error' });
                
                return null;
            }
            if (!isReady) {
                const address = await connectWallet();
                if (address != auth.wallet_address) {
                    await disconnectWallet();
                    enqueueSnackbar("Non registered wallet!", { variant: 'error' });

                    return null;
                }
                
                return address;
            }
            
            return auth.wallet_address;
        } catch (err) {
            enqueueSnackbar("Error occured!", { variant: 'error' });

            return null;
        }
    }

    return (
        <WrapperContext.Provider value={{
            getMatchList,
            getAttributes,
            identifyConnectWallet
        }}>
            { children }
        </WrapperContext.Provider>
    );
}