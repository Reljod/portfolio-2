import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../server/env";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailAddress: {
          label: "Email Adress",
          type: "text",
          placeholder: "Enter your email address",
        },
        firstName: {
          label: "Firstname",
          type: "text",
          placeholder: "Enter your firstname",
        },
      },
      async authorize(credentials, _req) {
        if (!credentials?.firstName || !credentials?.emailAddress) {
          return null;
        }

        const user = {
          id: 1,
          name: credentials?.firstName,
          email: credentials?.emailAddress,
        };
        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
