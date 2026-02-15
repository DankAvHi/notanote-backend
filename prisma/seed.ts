import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL!,
    }),
});

async function main() {
    console.log('🌱 Start seeding...');

    await prisma.note.deleteMany();
    await prisma.user.deleteMany();

    const password1Hash: string = await bcrypt.hash('password123', bcrypt.genSaltSync(10));
    const password2Hash: string = await bcrypt.hash('securepassword', bcrypt.genSaltSync(10));

    await prisma.user.create({
        data: {
            name: 'Dan',
            password: password1Hash,
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
            password: password2Hash,
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