
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { sourcesTable } from "@/server/db/schema/sources";

export const sourcesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx: { db } }) => {
    const sources = await db.select().from(sourcesTable);

    return sources;
  }),
});
