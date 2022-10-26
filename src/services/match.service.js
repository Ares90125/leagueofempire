import { sendRequest } from "./api";

export const getMatchList = () => {
    return sendRequest({
        url: '/match/list',
        method: 'GET'
    });
}

export const claimMatchTokens = ({ matchIDs, connectedWallet }) => {
    return sendRequest({
        url: '/match/claim',
        method: 'POST',
        data: {
            matchIDs, connectedWallet
        }
    });
}