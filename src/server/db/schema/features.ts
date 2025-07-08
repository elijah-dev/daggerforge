import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestampts } from "./utils";
import { adversariesTable } from "./adversaries";
import { featureTypes, featureTypesEnum } from "@/zod/feature";

export const featureType = pgEnum("feature_type", featureTypes);

export const featuresTable = pgTable("features", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  adversary_id: uuid()
    .notNull()
    .references(() => adversariesTable.id),
  name: text().notNull(),
  description: text().notNull(),
  type: featureType().default(featureTypesEnum.Enum.action).notNull(),
  ...timestampts,
});
