import { InvalidPropertyError } from '../helpers/errors.js';
import { ObjectId } from 'mongodb';
import { propertyRequired, toFixedNumber, upperFirst } from '../helpers/common.js';

export function makeBicycle(bicycleData = propertyRequired('bicycleData')) {
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
    return { ...bicycleData };
}

function validateTextField(field, input) {
    if (typeof input === 'string' && input.length < 5) {
        throw new InvalidPropertyError(`"${field}" must be at least 5 characters long`);
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

function normalize({ name, type, color, wheel_size, price, description, ...other }) {
    return {
        ...other,
        name: upperFirst(name),
        type: upperFirst(type),
        color: upperFirst(color),
        wheel_size: toFixedNumber(wheel_size, 1),
        price: toFixedNumber(price, 2),
        description: upperFirst(description),
    };
}