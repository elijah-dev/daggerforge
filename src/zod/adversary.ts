import { z } from "zod";
import { FeatureSchema } from "./feature";
import { ExperienceSchema } from "./experience";

export const adversaryTypes = [
  "bruiser",
  "horde",
  "leader",
  "minion",
  "ranged",
  "skulk",
  "social",
  "solo",
  "standard",
  "support",
] as const;

export const adversaryAttackRanges = [
  "melee",
  "very close",
  "close",
  "far",
  "very far",
] as const;

export const adversaryTiers = ["1", "2", "3", "4"] as const;

export const adversaryDamageTypes = ["physical", "magical"] as const;

export const adversaryDamageDice = [
  "4",
  "6",
  "8",
  "10",
  "12",
  "20",
  "100",
] as const;

export const adversaryTypesEnum = z.enum(adversaryTypes);
export const adversaryAttackRangesEnum = z.enum(adversaryAttackRanges);
export const adversaryDamageTypesEnum = z.enum(adversaryDamageTypes);
export const adversaryTiersEnum = z.enum(adversaryTiers);
export const adversaryDamageDiceEnum = z.enum(adversaryDamageDice);

export const adversaryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  tier: adversaryTiersEnum,
  type: adversaryTypesEnum,
  creaturesPerHp: z.number().int().optional(),
  description: z.string().optional(),
  difficulty: z.number().int().min(0, "Difficulty must be at least 0"),
  majorThreshold: z.number().int().min(0, "Major threshold must be at least 0"),
  severeThreshold: z
    .number()
    .int()
    .min(0, "Severe threshold must be at least 0"),
  hp: z
    .number()
    .int()
    .min(1, "HP must be at least 1")
    .max(20, "HP cannot exceed 20"),
  stress: z
    .number()
    .int()
    .min(1, "Stress must be at least 1")
    .max(20, "Stress cannot exceed 20"),
  attackModifier: z.number().int(),
  attackName: z.string().min(1, "Attack name is required"),
  attackRange: adversaryAttackRangesEnum.default("melee"),
  attackDamageDieCount: z.number().int().min(1, "Minimum 1 die required"),
  attackDamageDie: adversaryDamageDiceEnum.default("6"),
  attackDamageModifier: z.number().int().default(0),
  attackDamageType: adversaryDamageTypesEnum.default("physical"),
  motivesAndTactics: z
    .string()
    .array()
    .nonempty("At least one motive or tactic is required")
    .max(6, "Maximum 6 motives and tactics allowed"),
  experiences: z
    .array(ExperienceSchema)
    .max(6, "Maximum 6 experiences allowed"),
  public: z.boolean().default(false),
  features: z.array(FeatureSchema).default([]),
  source: z.string().optional(),
});

export type AdversaryTypes = z.infer<typeof adversaryTypesEnum>;
export type AdversaryAttackRanges = z.infer<typeof adversaryAttackRangesEnum>;
export type AdversaryDamageTypes = z.infer<typeof adversaryDamageTypesEnum>;
export type AdversaryTiers = z.infer<typeof adversaryTiersEnum>;
export type AdversaryDamageDice = z.infer<typeof adversaryDamageDiceEnum>;

export type AdversaryForm = z.infer<typeof adversaryFormSchema>;
