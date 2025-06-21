import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";

export const authConfig = {
  providers: [Google, Discord],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log("JWT Callback - Token:", token, user);

      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: async ({ session, token }) => {
      console.log("Session Callback - Session:", session, "Token:", token);
      
      if (token && token.id) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
