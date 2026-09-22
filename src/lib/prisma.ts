import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient | null;
};

export const prisma = process.env.DATABASE_URL
  ? globalForPrisma.prisma ??
    new PrismaClient({
      log: ["error", "warn"],
    })
  : null;

if (process.env.DATABASE_URL && process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
