import { Session } from "next-auth";

const isAuthorized = (session: Session | null) => {
  return session && !session.isUnauthenticated;
};

export { isAuthorized };
