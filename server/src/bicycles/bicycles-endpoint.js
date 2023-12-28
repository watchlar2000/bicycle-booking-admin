import { makeHttpError } from '../utils/http-error.js';
import { prisma } from '../db/index.js';
import { makeBicycle } from './bicycle.js';

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
                        errorMessage: `${httpRequest.method} not allowed`,
                    },
                );
        }
    };

    async function getAll() {
        const data = await bicycleList.findMany();

        return {
            headers: {
                'Content-Type': 'application/json',
            },
            statusCode: 200,
            data: JSON.stringify(data),
        };
    }

    async function post(httpRequest) {
        const { body } = httpRequest;

        if (!body) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: 'Bad request. POST body must be a valid JSON.',
            });
        }

        const bicycle = makeBicycle(body);

        const data = await bicycleList.create(bicycle);

        return {
            headers: {
                'Content-Type': 'application/json',
            },
            statusCode: 200,
            data: JSON.stringify(data),
        };
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