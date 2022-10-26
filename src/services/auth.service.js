import { sendRequest } from "./api";

export const loginUser = ({ wallet_address, email, password, mode }) => {
    return sendRequest({
        url: '/auth/login',
        method: 'POST',
        data: {
            wallet_address, email, password, mode
        }
    });
}

export const registerUser = ({ username, email, password, wallet_address }) => {
    return sendRequest({
        url: '/auth/register',
        method: 'POST',
        data: {
            username, email, password, wallet_address
        }
    });
}

export const confirmEmail = ({ email }) => {
    return sendRequest({
        url: '/auth/confirm',
        method: 'POST',
        data: {
            email
        }
    });
}


export const confirmForgetPassEmail = ({ email }) => {
    return sendRequest({
        url: '/auth/forgetPassword',
        method: 'POST',
        data: {
            email
        }
    });
}

export const updatePassword = ({ wallet_address, password, token }) => {
    return sendRequest({
        url: '/auth/updatePassword',
        method: 'POST',
        data: {
            wallet_address, password, token
        }
    });
}

export const verifyUser = ({ token }) => {
    return sendRequest({
        url: '/auth/verify',
        method: 'GET',
        params: {
            token
        }
    });
}

export const airdropNFT = () => {
    return sendRequest({
        url: '/auth/airdropNFT',
        method: 'GET',
    });
}