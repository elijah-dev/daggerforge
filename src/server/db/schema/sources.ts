import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestampts } from "./utils";

export const sourcesTable = pgTable("sources", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: text().notNull().unique(),
  ...timestampts,
});

export type SelectSource = typeof sourcesTable.$inferSelect;
