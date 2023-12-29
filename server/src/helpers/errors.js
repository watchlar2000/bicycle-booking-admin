export class InvalidPropertyError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'InvalidPropertyError';
    }
}

export class PropertyRequiredError extends Error {
    constructor(param) {
        super(`${param} can not be null or undefined.`);
        this.name = 'PropertyRequiredError';
    }
}