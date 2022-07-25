import PusherServer from "pusher";
import { env } from "../env";

export const PusherServerClient = new PusherServer({
  appId: env.PUSHER_APP_ID,
  key: env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: env.PUSHER_APP_SECRET!,
  useTLS: env.NEXT_PUBLIC_PUSHER_SERVER_TLS === "true",
  cluster: env.NEXT_PUBLIC_PUSHER_SERVER_CLUSTER!,
});
