import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";
import { timestampts } from "./utils";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  first_name: varchar({ length: 255 }),
  last_name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  ...timestampts,
});
