import { pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { timestampts } from "./utils";

export const motivesTacticsTable = pgTable("motives_tactics", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: text().notNull().unique(),
  is_public: boolean().default(false).notNull(),
  ...timestampts,
});
