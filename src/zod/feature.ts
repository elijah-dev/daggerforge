import { z } from "zod";

export const featureTypes = ["action", "reaction", "passive"] as const;

export const featureTypesEnum = z.enum(featureTypes);

export const FeatureSchema = z.object({
  name: z.string().min(1, "Feature name is required"),
  description: z.string(),
  type: featureTypesEnum.default("action"),
});

export type Feature = z.infer<typeof FeatureSchema>;
