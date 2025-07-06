import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestampts } from "./utils";
import { adversariesTable } from "./adversaries";

export const featureType = pgEnum("feature_type", ["action", "passive", "reaction"]);

export const featuresTable = pgTable("features", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  adversary_id: uuid()
    .notNull()
    .references(() => adversariesTable.id),
  name: text().notNull(),
  value: integer(),
  modified_attack_damage: text(),
  description: text().notNull(),
  type: featureType().default("action").notNull(),
  fear_cost: integer(),
  stress_cost: integer(),
  ...timestampts,
});
