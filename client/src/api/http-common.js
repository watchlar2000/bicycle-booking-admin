import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const config = {
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
};

export default axios.create(config);
