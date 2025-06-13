import { usersTable } from "@/server/db/schema/users";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ctx: {db}}) => {
    const  users = await db.select().from(usersTable);

    return users;
  }),
  create: publicProcedure
    .input(
      z.object({
        first_name: z.string().nullish(),
        last_name: z.string().nullish(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input, ctx: { db } }) => {
      const newUser = await db.insert(usersTable).values({
        first_name: input.first_name,
        last_name: input.last_name,
        email: input.email,
      }).returning();

      return newUser;
    }),
});
