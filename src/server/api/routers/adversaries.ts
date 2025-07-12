import { adversariesTable } from "@/server/db/schema/adversaries";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { adversaryFormSchema } from "@/zod/adversary";
import { motivesTacticsTable } from "@/server/db/schema/motives-tactics";
import { adversariesMotivesTacticsTable } from "@/server/db/schema/adversaries-motives-tactics";
import {
  experiencesTable,
  SelectExperience,
} from "@/server/db/schema/experiences";
import { featuresTable, SelectFeature } from "@/server/db/schema/features";
import {
  prepareAdversaryInsert,
  groupAdversaries,
} from "@/server/api/utils/adversaries";
import { eq, desc } from "drizzle-orm";

export const adversariesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx: { db } }) => {
    const adversaries = await db
      .select()
      .from(adversariesTable)
      .leftJoin(
        adversariesMotivesTacticsTable,
        eq(adversariesTable.id, adversariesMotivesTacticsTable.adversary_id)
      )
      .leftJoin(
        motivesTacticsTable,
        eq(
          adversariesMotivesTacticsTable.motive_tactic_id,
          motivesTacticsTable.id
        )
      )
      .leftJoin(
        experiencesTable,
        eq(adversariesTable.id, experiencesTable.adversary_id)
      )
      .leftJoin(
        featuresTable,
        eq(adversariesTable.id, featuresTable.adversary_id)
      )
      .orderBy(desc(adversariesTable.name));

    return groupAdversaries(adversaries);
  }),

  create: protectedProcedure
    .input(adversaryFormSchema)
    .mutation(async ({ input, ctx: { db, user } }) => {
      const adversary = await db.transaction(async (tx) => {
        const [createdAdversary] = await tx
          .insert(adversariesTable)
          .values([prepareAdversaryInsert(input, user)])
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

        let createdExperiences: SelectExperience[] = [];

        if (input.experiences.length !== 0) {
          createdExperiences = await tx
            .insert(experiencesTable)
            .values(
              input.experiences.map((experience) => ({
                adversary_id: createdAdversary.id,
                name: experience.name.toLowerCase(),
                value: experience.value,
              }))
            )
            .returning();
        }

        let createdFeatures: SelectFeature[] = [];

        if (input.features.length !== 0) {
          createdFeatures = await tx
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
        }

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
