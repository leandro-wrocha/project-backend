import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function loadSeed() {
  console.log('Loading seeders...');

  await prisma.$executeRaw(Prisma.sql`
    INSERT INTO roles (id, name)
    VALUES ('d860f629-249a-41ae-b431-7c068969fc8c', 'user')
  `);
  // return;

  await prisma.$queryRaw(Prisma.sql`
    INSERT INTO roles (id, name)
    VALUES ('2ef3834f-2060-4f9a-9d99-8419d094a3cc', 'administrator')
  `);

  const role = await prisma.role.findFirst({
    where: {
      name: 'administrator',
    },
    select: {
      id: true,
    },
  });

  await prisma.$queryRaw(Prisma.sql`
    INSERT INTO users (id, name, email, password, role_id)
    VALUES (
      '5894fdb8-a864-42b9-b12d-b0f718e455d2',
      'Administrator', 'administrator@mail.com',
      '$2a$11$TV/Av37b3RIz27DCSxRzK.qcB75/EZ5N64bH42mTfciz918iW1CeS',
      ${role.id}
    )
  `);

  console.log('Complete!');
}

try {
  loadSeed();
} catch (error) {
  console.log('Seed is ready');
}
