import {
  check,
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";
import { timestampts } from "./utils";
import { sql } from "drizzle-orm";
import { usersTable } from "./users";
import {
  adversaryAttackRanges,
  adversaryDamageTypes,
  adversaryTypes,
} from "@/zod/adversary";
import { sourcesTable } from "./sources";

export const adversaryType = pgEnum("adversary_type", adversaryTypes);

export const attackRange = pgEnum("attack_range", adversaryAttackRanges);

export const damageType = pgEnum("damage_type", adversaryDamageTypes);

export const adversariesTable = pgTable(
  "adversaries",
  {
    id: uuid().primaryKey().defaultRandom().notNull(),
    name: text().notNull(),
    tier: integer().notNull().default(1),
    type: adversaryType().default("standard").notNull(),
    creatures_per_hp: integer(),
    description: text(),
    difficulty: integer().notNull(),
    major_threshold: integer(),
    severe_threshold: integer(),
    hp: integer().notNull(),
    stress: integer().notNull(),
    attack_modifier: integer().notNull().default(0),
    attack_name: text().notNull(),
    attack_range: attackRange().default("melee").notNull(),
    attack_damage: text().notNull(),
    attack_damage_type: damageType().default("physical").notNull(),
    created_by: uuid().references(() => usersTable.id, {
      onDelete: "set null",
    }),
    source: uuid().references(() => sourcesTable.id, { onDelete: "set null" }),
    is_public: boolean().default(false).notNull(),
    ...timestampts,
  },
  (table) => {
    return [
      check("tier_check", sql`${table.tier} >= 1 AND ${table.tier} <= 4`),
    ];
  }
);

export type SelectAdversary = typeof adversariesTable.$inferSelect;
