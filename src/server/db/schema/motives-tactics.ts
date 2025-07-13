import { pgTable, text, uuid, boolean, uniqueIndex } from "drizzle-orm/pg-core";
import { timestampts } from "./utils";

export const motivesTacticsTable = pgTable(
  "motives_tactics",
  {
    id: uuid().primaryKey().defaultRandom().notNull(),
    name: text().notNull().unique(),
    is_public: boolean().default(false).notNull(),
    ...timestampts,
  },
  (table) => [uniqueIndex("motives_tactics_name_idx").on(table.name)]
);

export type SelectMotiveTactic = typeof motivesTacticsTable.$inferSelect;
