import { PrismaClient } from '@prisma/client';
import { bicycleData } from './bicycles.data.js';

export const prisma = new PrismaClient();

async function main() {
    for (const b of bicycleData) {
        const bicycle = await prisma.bicycle.create({
            data: b,
        });
        console.log(`Created bicycle with id: ${bicycle.id}`);
    }
}

// makeBicycle({
//     id: '78973baff352fb0ffcd1d11e',
//     name: 'asdasdsd',
//     price: 'jel',
// });

// main()
//     .then(async () => {
//         await prisma.$disconnect();
//     })
//     .catch(async (e) => {
//         console.error(e);
//         await prisma.$disconnect();
//         process.exit(1);
//     });