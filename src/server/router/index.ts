// src/server/router/index.ts
import superjson from "superjson";
import { createRouter } from "./context";

import { authRouter } from "./auth";
import { fetchMessagesRouter } from "./chat/fetchMessages";
import { sendMessageRouter } from "./chat/sendMessage";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("fetchMessage.", fetchMessagesRouter)
  .merge("sendMessage.", sendMessageRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
