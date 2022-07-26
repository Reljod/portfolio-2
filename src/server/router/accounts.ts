import { Role } from "server/db/client";
import { z } from "zod";
import { createRouter } from "./context";

export const fetchAccounts = createRouter()
  .query("fetchAllAccounts", {
    async resolve({ input, ctx }) {
      try {
        const users = await ctx.prisma.user.findMany();
        return users;
      } catch (err) {
        throw err;
      }
    },
  })
  .query("fetchUserAccounts", {
    async resolve({ ctx }) {
      try {
        const users = await ctx.prisma.user.findMany({
          where: {
            roles: Role.USER,
          },
        });
        return users;
      } catch (err) {
        throw err;
      }
    },
  })
  .query("fetchAdminAccounts", {
    async resolve({ ctx }) {
      try {
        const users = await ctx.prisma.user.findMany({
          where: {
            roles: Role.ADMIN,
          },
        });
        return users;
      } catch (err) {
        throw err;
      }
    },
  })
  .query("fetchAccountImageByID", {
    input: z.object({
      accountId: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        const data = await ctx.prisma.user.findFirst({
          where: {
            id: input.accountId,
          },
          select: {
            name: true,
            image: true,
          },
        });
        return data;
      } catch (err) {
        throw err;
      }
    },
  });
