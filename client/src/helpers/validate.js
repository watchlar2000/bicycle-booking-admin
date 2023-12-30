import {
    MINIMUM_ID_LENGTH,
    MINIMUM_TEXT_FIELD_LENGTH,
} from '@/helpers/constants.js';

export const checkIfErrorsExisting = (obj) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === false) {
            return false;
        }
    }
    return true;
};

export const validateTextField = (input) => {
    return !(
        typeof input === 'string' && input.length < MINIMUM_TEXT_FIELD_LENGTH
    );
};

export const validateNumberField = (input) => {
    return !isNaN(Number(input)) && input !== '';
};

export const validateId = (input) => {
    return !(input.length < MINIMUM_ID_LENGTH);
};
