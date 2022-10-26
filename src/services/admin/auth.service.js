import { sendRequest } from "@services/api";

export const loginAdmin = ({ email, password }) => {
    return sendRequest({
        url: '/admin/auth/login',
        method: 'POST',
        data: {
            email, password
        }
    });
}