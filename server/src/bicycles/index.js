import { makeBicycleList } from './bicycle-list.js';
import { makeBicyclesEndpointHandler } from './bicycles-endpoint.js';
import { prisma } from '../db/index.js';

const bicyclesList = makeBicycleList(prisma);
export const bicycleEndpointHandler = makeBicyclesEndpointHandler(bicyclesList);