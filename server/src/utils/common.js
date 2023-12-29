import crypto from 'node:crypto';
import { PropertyRequiredError } from './errors.js';

export const generateId = (sizeInBytes) => crypto.randomBytes(sizeInBytes).toString('hex');

export const propertyRequired = (param) => {
    throw new PropertyRequiredError(param);
};

export const upperFirst = (word) => {
    if (word.length === 1) {
        return word.toUpperCase();
    }
    return word.charAt(0).toUpperCase() + word.substring(1);
};

export const toFixedNumber = (num, digits) => {
    return Number(parseFloat(num).toFixed(digits));
};