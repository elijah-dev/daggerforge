import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { db } from "./server/db/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { usersTable } from "./server/db/schema/users";
import { accountsTable } from "./server/db/schema/accounts";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable,
    accountsTable,
  }),
  ...authConfig,
});
