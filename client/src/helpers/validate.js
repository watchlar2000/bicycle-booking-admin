import {
    ID_FIELD_LENGTH,
    MINIMUM_TEXT_FIELD_LENGTH,
} from '@/helpers/constants.js';
import { normalizeString } from '@/helpers/utils.js';

export const checkIfErrorsExisting = (obj) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === false) {
            return false;
        }
    }
    return true;
};

export const validateTextField = (input) => {
    return (
        typeof input === 'string' &&
        input.trim().length >= MINIMUM_TEXT_FIELD_LENGTH
    );
};

export const validateNumberField = (input) => {
    const inputNormalized = normalizeString(input);
    return !isNaN(Number(inputNormalized)) && inputNormalized !== '';
};

export const validateId = (id) => {
    const idTrimmed = id.trim();
    return (
        typeof idTrimmed === 'string' &&
        idTrimmed.length === ID_FIELD_LENGTH &&
        !/\s/.test(idTrimmed)
    );
};
