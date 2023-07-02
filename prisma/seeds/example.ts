import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const seedExample = async () => {
  const exampleMember = await prisma.member.create({
    data: {
      username: "exampleusername",
      strikes: 1,
    },
  });

  await prisma.pointRecord.create({
    data: {
      amount: 5,
      reason: "Example reason",
      member: {
        connect: {
          id: exampleMember.id,
        },
      },
    },
  });
};

export default seedExample;

