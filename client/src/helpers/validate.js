export function checkIfErrorsExisting(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === false) {
            return false;
        }
    }
    return true;
}

export function validateTextField(input) {
    return !(typeof input === 'string' && input.length < 5);
}

export function validateNumberField(input) {
    return !isNaN(Number(input)) && input !== '';
}