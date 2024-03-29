import { PusherServerClient } from "server/common/pusher";
import { z } from "zod";
import { createRouter } from "../context";

export const sendMessageRouter = createRouter().mutation("sendMessage", {
  input: z.object({
    sender: z.string().cuid(),
    receiver: z.string().cuid(),
    message: z.string().min(1).max(160),
  }),
  async resolve({ input, ctx }) {
    try {
      await ctx.prisma.chat.create({
        data: {
          sender: input.sender,
          receiver: input.receiver,
          message: input.message,
        },
      });

      await PusherServerClient.trigger("chat", "send-message", {});
    } catch (err) {
      console.error("Send message server error", err);
      throw err;
    }
  },
});
