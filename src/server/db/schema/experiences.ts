import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestampts } from "./utils";
import { adversariesTable } from "./adversaries";

export const experiencesTable = pgTable("experiences", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  adversary_id: uuid()
    .notNull()
    .references(() => adversariesTable.id, { onDelete: "cascade" }),
  name: text().notNull(),
  value: integer().notNull().default(0),
  ...timestampts,
});

export type SelectExperience = typeof experiencesTable.$inferSelect;
