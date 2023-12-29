import { PrismaClient } from '@prisma/client';
import { bicycleData } from './bicycles.data.js';

export const prisma = new PrismaClient();

async function main() {
    const findMany = await prisma.bicycle.findMany();

    if (findMany.length) {
        return;
    }

    for (const b of bicycleData) {
        const bicycle = await prisma.bicycle.create({
            data: b,
        });
        console.log(`Created bicycle with id: ${bicycle.id}`);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });