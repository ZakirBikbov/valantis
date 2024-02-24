import axios from 'axios';
import md5 from 'md5';

export const API_URL = 'https://api.valantis.store:41000/';

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

function generateAuthString(password: string) {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return md5(`${password}_${timestamp}`);
}

$api.interceptors.request.use((config) => {
    config.headers['X-Auth'] = generateAuthString('Valantis');
    return config;
});