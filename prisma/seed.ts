import { PrismaClient } from "@prisma/client";
import seedExample from "./seeds/example";

const prisma = new PrismaClient();

const main = async () => {
  await seedExample();
  console.log("The seed was successful!");
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
