import axios from 'axios';

let axiosInstance = axios.create({
    //baseURL: `${ process.env.REACT_APP_API_SERVER_URL }/api`,
    baseURL: "http://localhost:5000/api",
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

export const setAuthToken = token => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${ token }`;
};

export const sendRequest = ({ url, method, data, params }) => {
    return new Promise((resolve, reject) => {
        axiosInstance({
            method,
            url,
            params: params || {},
            data: data || {}
        })
        .then(response => {
            resolve(response.data)
        })
        .catch(err => {
            reject(err.response)
        });
    });
}

export default axiosInstance;