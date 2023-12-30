import axios from 'axios';
import { notify } from '@/helpers/notify.js';

const BASE_URL = 'http://localhost:3001';

const config = {
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
};

const api = axios.create(config);

api.interceptors.response.use(
    (response) => {
        const method = response.config.method.toUpperCase();

        if (method === 'POST') {
            const msg = 'Bicycle item has been added successfully.';
            notify.displayNotification(msg, true);
        } else if (method === 'DELETE') {
            const msg = 'Bicycle item removed.';
            notify.displayNotification(msg, true);
        }

        return response;
    },
    (error) => {
        let msg = '';

        if (error.code === 'ERR_NETWORK') {
            return Promise.reject({
                success: false,
                error: '502 Bad Gateway',
            });
        }

        if (error.response.status === 409) {
            msg = `This ID has been found in the database.`;
        } else {
            msg = 'Something is wrong with the server.';
        }

        notify.displayNotification(msg, false);
        return Promise.reject(error);
    },
);

export default api;
