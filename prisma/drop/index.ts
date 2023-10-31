const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

(async () => {
  try {
    await Promise.all([
      prisma.user.deleteMany({}),
      prisma.list.deleteMany({}),
      prisma.item.deleteMany({}),
    ]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
