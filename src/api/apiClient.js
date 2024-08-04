import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const _get = (url, config = {}) => {
    return apiClient.get(url, config);
};

export const _delete = (url, config = {}) => {
    return apiClient.delete(url, config);
};

export const _put = (url, data = {}, config = {}) => {
    return apiClient.put(url, data, config);
};

export const _post = (url, data = {}, config = {}) => {
    return apiClient.post(url, data, config);
};