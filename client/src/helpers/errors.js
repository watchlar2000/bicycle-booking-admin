export const errorMessage = {
    id: (id = 'ID') => `${id} must be equal to a 12-character string`,
    text: (textField = 'field') =>
        `${textField} must be at least 5 characters long`,
    number: (numberField = 'field') => `${numberField} must be a valid number`,
};
