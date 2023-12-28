import crypto from 'node:crypto';

export const generateId = (sizeInBytes) => crypto.randomBytes(sizeInBytes).toString('hex');