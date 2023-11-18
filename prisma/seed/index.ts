// import { faker } from "@faker-js/faker";
// import { PrismaClient, User } from "@prisma/client";
const { faker } = require("@faker-js/faker");
const { PrismaClient, User } = require("@prisma/client");

const prisma = new PrismaClient();

type UserWithoutId = Omit<typeof User, "id">;
// type UserWithoutId = Omit<User, "id">;

const generateUsers = () => {
  return new Array(5).fill(null).map<UserWithoutId>(() => ({
    login: faker.internet.userName(),
    // password: password1
    password: "$2b$10$s0TNskiqVZqVp/vWsqOFgOG4r34JKi/wpxpvOLVg8.ttnv5jmcAK.",
  }));
};

(async () => {
  try {
    await Promise.all([
      ...generateUsers().map(async (user) => {
        await prisma.user.create({
          data: {
            ...user,
            lists: {
              create: Array.from({ length: 1000 })
                .fill(null)
                .map(() => ({
                  name: faker.lorem.words(2),
                  tags: Array.from({ length: 10 })
                    .fill(null)
                    .map(() => faker.lorem.word()),
                  category: faker.lorem.word(),
                  description: faker.lorem.words(10),
                })),
            },
          },
        });
      }),
    ]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
