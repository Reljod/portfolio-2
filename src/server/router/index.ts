// src/server/router/index.ts
import superjson from "superjson";
import { createRouter } from "./context";

import { authRouter } from "./auth";
import { fetchMessagesRouter } from "./chat/fetchMessages";
import { sendMessageRouter } from "./chat/sendMessage";
import { exampleRouter } from "./example";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("fetchMessage.", fetchMessagesRouter)
  .merge("sendMessage.", sendMessageRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
