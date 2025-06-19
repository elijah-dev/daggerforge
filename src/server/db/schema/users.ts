import { pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core";
import { timestampts } from "./utils";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar(),
  first_name: varchar({ length: 255 }),
  last_name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  emailVerified: timestamp({mode: "date"}),
  image: varchar({ length: 255 }),
  ...timestampts,
});
