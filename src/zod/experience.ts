import z from "zod";

export const ExperienceSchema = z.object({
  name: z.string(),
  value: z.number(),
});

export type Experience = z.infer<typeof ExperienceSchema>;
