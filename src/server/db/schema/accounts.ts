import { integer, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { usersTable } from "./users";

export const accountsTable = pgTable(
  "account",
  {
    userId: uuid()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    type: text().$type<AdapterAccountType>().notNull(),
    provider: text().notNull(),
    providerAccountId: text().notNull(),
    refresh_token: text(),
    access_token: text(),
    expires_at: integer(),
    token_type: text(),
    scope: text(),
    id_token: text(),
    session_state: text(),
  },
  (account) => [
    primaryKey({
      name: "compoundKey",
      columns: [account.provider, account.providerAccountId],
    }),
  ]
);
