export const adaptRequest = (req) => {
    const { path, method, params: pathParams, body } = req;
    return Object.freeze({
        path,
        method,
        pathParams,
        body,
    });
};