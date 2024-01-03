import { initFormData } from '@/helpers/constants.js';

export const generateErrorObj = () => {
    const err = {};
    for (const key of Object.keys(initFormData)) {
        err[key] = true;
    }

    return err;
};

export const toHex = (str) => {
    let result = '';
    for (let i = 0; i < str.length; ++i) {
        result += str.charCodeAt(i).toString(16);
    }
    return result;
};

export const normalizeString = (str) => {
    return str.trim().replace(/\s+/g, ' ');
};
