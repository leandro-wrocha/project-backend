import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function loadSeed() {
  console.log('Loading seeders...');

  await prisma.$queryRaw(Prisma.sql`
    INSERT INTO users (id, name, email, password, role)
    VALUES (
      '5894fdb8-a864-42b9-b12d-b0f718e455d2',
      'Administrator', 'administrator@mail.com',
      '$2a$11$TV/Av37b3RIz27DCSxRzK.qcB75/EZ5N64bH42mTfciz918iW1CeS',
      'ADMIN'
    )
  `);

  console.log('Complete!');
}

try {
  loadSeed();
} catch (error) {
  console.log('Seed is ready');
}
