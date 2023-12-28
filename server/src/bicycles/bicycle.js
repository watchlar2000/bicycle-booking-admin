import { InvalidPropertyError } from '../utils/errors.js';
import { ObjectId } from 'mongodb';

export function makeBicycle(bicycleData) {
    const validBicycle = validate(bicycleData);
    const normalBicycle = normalize(validBicycle);

    return Object.freeze(normalBicycle);
}

function validate(bicycleData) {
    const { id, name, type, color, price, wheel_size } = bicycleData;
    validateId('ID', id);
    validateTextField('Name', name);
    validateTextField('Type', type);
    validateTextField('Color', color);
    validateNumberField('Price', price);
    validateNumberField('Wheel size', wheel_size);
    return {
        ...bicycleData,
    };
}

function validateTextField(field, input) {
    if (typeof input === 'string' && input.length < 5) {
        throw new InvalidPropertyError(`"${field}" must be at least 5-character long`);
    }
}

function validateNumberField(field, input) {
    if (isNaN(input)) {
        throw new InvalidPropertyError(`"${field}" must be a number`);
    }
}

function validateId(field, id) {
    if (!ObjectId.isValid(id)) {
        throw new InvalidPropertyError(`"${field}" must be a 12-byte string`);
    }
}

function normalize({ price, wheel_size, ...otherInfo }) {
    return {
        ...otherInfo,
        price: +price,
        wheel_size: +wheel_size,
        // status: 'Available',
    };
}