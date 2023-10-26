const { faker } = require("@faker-js/faker");
const { PrismaClient, User } = require("@prisma/client");

const prisma = new PrismaClient();

type UserWithoutId = Omit<typeof User, "id">;

const generateUsers = () => {
  return new Array(10).fill(null).map<UserWithoutId>(() => ({
    login: faker.internet.userName(),
    password: faker.internet.password(),
  }));
};

(async () => {
  try {
    await Promise.all([
      ...generateUsers().map(async (user) => {
        await prisma.user.create({ data: user });
      }),
    ]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
