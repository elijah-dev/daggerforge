import { pgTable, varchar, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { timestampts } from "./utils";
import { roles } from "@/zod/role";

export const role = pgEnum("role", roles);

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar(),
  email: varchar({ length: 255 }).notNull().unique(),
  emailVerified: timestamp({ mode: "date" }),
  image: varchar({ length: 255 }),
  role: role().default("user").notNull(),
  ...timestampts,
});
