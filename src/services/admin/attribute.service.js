import { sendRequest } from "@services/api";

export const getGameAttributes = () => {
    return sendRequest({
        url: '/admin/attribute',
        method: 'GET',
    });
}

export const updateGameAttributes = ({ attribute }) => {
    return sendRequest({
        url: '/admin/attribute',
        method: 'POST',
        data: {
            attribute
        }
    });
}