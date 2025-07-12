import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import { rolesEnum } from "./zod/role";
import z from "zod";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: z.infer<typeof rolesEnum>;
  }

  interface JWT {
    id: string;
    role?: z.infer<typeof rolesEnum>;
  }
}

export const authConfig = {
  providers: [
    Google({
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? rolesEnum.Enum.user,
        };
      },
    }),
    Discord({
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.global_name,
          email: profile.email,
          image: profile.avatar,
          role: profile.role ?? rolesEnum.Enum.user,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role || rolesEnum.Enum.user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token && token.id) {
        session.user.id = token.id as string;
      }

      if (token && token.role) {
        session.user.role = token.role as z.infer<typeof rolesEnum>;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
