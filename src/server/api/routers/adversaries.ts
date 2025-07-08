import { adversariesTable } from "@/server/db/schema/adversaries";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { adversarySchema } from "@/zod/adversary";
import { motivesTacticsTable } from "@/server/db/schema/motives-tactics";
import { adversariesMotivesTacticsTable } from "@/server/db/schema/adversaries-motives-tactics";
import { experiencesTable } from "@/server/db/schema/experiences";
import { featuresTable } from "@/server/db/schema/features";

export const adversariesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(adversarySchema)
    .mutation(async ({ input, ctx: { db, user } }) => {
      const adversary = await db.transaction(async (tx) => {
        const [createdAdversary] = await tx
          .insert(adversariesTable)
          .values([
            {
              name: input.name,
              tier: Number(input.tier),
              type: input.type,
              creatures_per_hp: input.creaturesPerHp ?? 0,
              description: input.description ?? "",
              difficulty: input.difficulty,
              major_threshold: input.majorThreshold,
              severe_threshold: input.severeThreshold,
              hp: input.hp,
              stress: input.stress,
              attack_modifier: input.attackModifier ?? 0,
              attack_name: input.attackName ?? "",
              attack_range: input.attackRange,
              attack_damage: `${input.attackDamageDieCount ?? 1}d${
                input.attackDamageDie ?? 6
              }${
                input.attackDamageModifier
                  ? `+${Math.abs(input.attackDamageModifier)}`
                  : ""
              }`,
              attack_damage_type: input.attackDamageType,
              is_public: input.public ?? false,
              created_by: user.id,
            },
          ])
          .returning();

        const createdTactics = await tx
          .insert(motivesTacticsTable)
          .values(
            input.motivesAndTactics.map((motive) => ({
              adversary_id: createdAdversary.id,
              name: motive.toLowerCase(),
              is_public: input.public ?? false,
            }))
          )
          .onConflictDoNothing()
          .returning();

        await tx.insert(adversariesMotivesTacticsTable).values(
          createdTactics.map((tactic) => ({
            adversary_id: createdAdversary.id,
            motive_tactic_id: tactic.id,
          }))
        );

        const createdExperiences = await tx
          .insert(experiencesTable)
          .values(
            input.experiences.map((experience) => ({
              adversary_id: createdAdversary.id,
              name: experience.name.toLowerCase(),
              value: experience.value,
            }))
          )
          .returning();

        const createdFeatures = await tx
          .insert(featuresTable)
          .values(
            input.features.map((feature) => ({
              adversary_id: createdAdversary.id,
              name: feature.name.toLowerCase(),
              description: feature.description,
              type: feature.type,
            }))
          )
          .returning();

        return {
          ...createdAdversary,
          motivesAndTactics: createdTactics,
          experiences: createdExperiences,
          features: createdFeatures,
        };
      });

      return adversary;
    }),
});
