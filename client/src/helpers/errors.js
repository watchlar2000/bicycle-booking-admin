export const errorMessage = {
    id: (id = 'ID') => `${id} must be a 12-byte string`,
    text: (textField = 'field') =>
        `${textField} must be at least 5 characters long`,
    number: (numberField = 'field') => `${numberField} must be a valid number`,
};
