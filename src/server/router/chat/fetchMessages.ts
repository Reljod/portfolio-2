import { z } from "zod";
import { createRouter } from "../context";

export const fetchMessagesRouter = createRouter().query("fetchMessages", {
  input: z.object({
    sender: z.string().cuid(),
    receiver: z.string().cuid(),
    messageCount: z.number().optional(),
  }),
  async resolve({ input, ctx }) {
    try {
      const messageCount = input.messageCount || 20;
      const messages = await ctx.prisma.chat.findMany({
        where: {
          OR: [
            {
              AND: [
                {
                  sender: {
                    equals: input.sender,
                  },
                },
                {
                  receiver: {
                    equals: input.receiver,
                  },
                },
              ],
            },
            {
              AND: [
                {
                  sender: {
                    equals: input.receiver,
                  },
                },
                {
                  receiver: {
                    equals: input.sender,
                  },
                },
              ],
            },
          ],
        },
        orderBy: {
          message_id: "desc",
        },
        take: messageCount,
        select: {
          id: true,
          sender: true,
          receiver: true,
          message: true,
        },
      });
      return messages;
    } catch (err) {
      throw err;
    }
  },
});
