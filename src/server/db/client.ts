// src/server/db/client.ts
import { PrismaClient, Role } from "@prisma/client";
import { env } from "../env";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export { Role };
