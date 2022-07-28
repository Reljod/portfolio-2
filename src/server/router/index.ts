// src/server/router/index.ts
import superjson from "superjson";
import { createRouter } from "./context";

import { fetchAccounts } from "./accounts";
import { authRouter } from "./auth";
import { fetchMessagesRouter } from "./chat/fetchMessages";
import { sendMessageRouter } from "./chat/sendMessage";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("fetchMessage.", fetchMessagesRouter)
  .merge("sendMessage.", sendMessageRouter)
  .merge("fetchAccounts.", fetchAccounts)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
