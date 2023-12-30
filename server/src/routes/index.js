import express from 'express';
import { bicycleEndpointHandler } from '../bicycles/index.js';
import { adaptRequest } from '../helpers/adapt-request.js';

export const router = express.Router();

router.all('/bicycles', bicyclesHandler);
router.all('/bicycles/:id', bicyclesHandler);

async function bicyclesHandler(req, res) {
    const httpRequest = adaptRequest(req);
    // console.log(httpRequest);
    try {
        const { headers, statusCode, data } =
            await bicycleEndpointHandler(httpRequest);
        res.set(headers).status(statusCode).send(data);
    } catch (e) {
        res.status(500).end();
    }
}
