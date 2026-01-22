import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL!,
    }),
});

async function main() {
    console.log('🌱 Start seeding...');

    await prisma.note.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.create({
        data: {
            name: 'Dan',
            password: 'password123',
            image: 'avatar1.png',
            notes: {
                create: [
                    { text: 'Купить молоко' },
                    { text: 'Изучить NestJS до конца' },
                    { text: 'Пофиксить ESLint' },
                ],
            },
        },
    });


    await prisma.user.create({
        data: {
            name: 'Alex',
            password: 'securepassword',
            image: 'avatar2.png',
            notes: {
                create: [
                    { text: 'Прогулка в парке' },
                    { text: 'Записаться в зал' },
                    { text: 'Купить подарок маме' },
                ],
            },
        },
    });

    console.log('✅ Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });