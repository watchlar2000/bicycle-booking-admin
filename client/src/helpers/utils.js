import { initFormData } from '@/helpers/constants.js';

export const generateErrorObj = () => {
    const err = {};
    for (const key of Object.keys(initFormData)) {
        err[key] = true;
    }

    return err;
};