import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { adversariesTable } from "./adversaries";
import { motivesTacticsTable } from "./motives-tactics";

export const adversariesMotivesTacticsTable = pgTable(
  "adversaries_motives_tactics",
  {
    adversary_id: uuid()
      .notNull()
      .references(() => adversariesTable.id, { onDelete: "cascade" }),
    motive_tactic_id: uuid()
      .notNull()
      .references(() => motivesTacticsTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      columns: [table.adversary_id, table.motive_tactic_id],
    }),
  ]
);
