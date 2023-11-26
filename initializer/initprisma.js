import { PrismaClient } from "@prisma/client";
let prisma;
const initprisma = () => {
    if (!prisma) {
        prisma = new PrismaClient();
    }
    return prisma;
};
export { prisma,initprisma }