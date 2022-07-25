import Pusher from "pusher-js";

export default new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_SERVER_CLUSTER,
  forceTLS: process.env.NEXT_PUBLIC_PUSHER_SERVER_TLS === "true",
});
