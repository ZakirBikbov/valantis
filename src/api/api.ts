import axios from 'axios';
import md5 from 'md5';

export const PRIMARY_API_URL = 'http://api.valantis.store:40000/';

export const SECONDARY_API_URL = 'https://api.valantis.store:41000/';

export const $api = axios.create({
    withCredentials: true,
    baseURL: PRIMARY_API_URL,
});

function generateAuthString(password: string) {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return md5(`${password}_${timestamp}`);
}

$api.interceptors.request.use((config) => {
    config.headers['X-Auth'] = generateAuthString('Valantis');
    return config;
});

$api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const { config, response } = error;
        const originalRequest = config;

        if (response && response.status === 500) {
            return axios.request({
                ...originalRequest,
                baseURL: SECONDARY_API_URL
            });
        }

        return Promise.reject(error);
    }
);