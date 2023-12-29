import { makeHttpError } from '../helpers/http-error.js';
import { prisma } from '../db/index.js';
import { makeBicycle } from './bicycle.js';
import { InvalidPropertyError } from '../helpers/errors.js';

export function makeBicyclesEndpointHandler(bicycleList) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case 'GET':
                return getAll();
            case 'POST':
                return post(httpRequest);
            case 'DELETE':
                return deleteById(httpRequest);
            case 'PUT':
                return updateById(httpRequest);
            default:
                return makeHttpError(
                    {
                        statusCode: 405,
                        errorMessage: `The request ${httpRequest.method} method is known by the server but is not supported by the target resource.`,
                    },
                );
        }
    };

    async function getAll() {
        const result = await bicycleList.findMany();
        return {
            headers: {
                'Content-Type': 'application/json',
            },
            statusCode: 200,
            data: JSON.stringify(result),
        };
    }

    async function post(httpRequest) {
        let bicycleData = httpRequest.body;

        if (!bicycleData) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: 'Bad request. POST body is missing.',
            });
        }

        if (typeof bicycleData === 'string') {
            try {
                bicycleData = JSON.parse(bicycleData);
            } catch {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: 'Bad request. POST body must be a valid JSON.',
                });
            }
        }

        try {
            const bicycle = makeBicycle(bicycleData);
            const data = await bicycleList.create(bicycle);
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 200,
                data: JSON.stringify(data),
            };
        } catch (e) {
            return makeHttpError({
                statusCode: e instanceof InvalidPropertyError ? 400 : 500,
                errorMessage: e.message,
            });
        }
    }

    async function updateById(httpRequest) {
        const { id } = httpRequest.pathParams;
        const { body } = httpRequest;
        const error = await validateId(id);

        if (error) {
            return makeHttpError(error);
        }

        const data = await bicycleList.updateById(id, body);
        return {
            headers: {
                'Content-Type': 'application/json',
            },
            statusCode: 200,
            data: JSON.stringify(data),
        };
    }

    async function deleteById(httpRequest) {
        const { id } = httpRequest.pathParams;
        const error = await validateId(id);

        if (error) {
            return makeHttpError(error);
        }

        const data = await bicycleList.deleteById(id);
        return {
            headers: {
                'Content-Type': 'application/json',
            },
            statusCode: 200,
            data: JSON.stringify(data),
        };
    }

    function isIdInDatabase(id) {
        return prisma.bicycle.findFirst({
            where: { id },
        });
    }

    async function validateId(id) {
        const error = {
            statusCode: 400,
            errorMessage: ``,
        };

        if (!id) {
            error.errorMessage = 'Bad request. No ID in the request params.';
            return error;
        }

        try {
            await isIdInDatabase(id);
        } catch (e) {
            error.errorMessage = 'Bad request. ID not existing.';
            return error;
        }

        return null;
    }
}