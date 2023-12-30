import http from './http-common.js';
import { BicycleDataService } from '@/api/bicycle.js';

export const BicycleService = BicycleDataService(http);
