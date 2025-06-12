import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { db } from "../db/db";

export const createTRPCContext = (context: { headers: Headers }) => {
  // You can add any context you need here, such as database connections or authentication
  return {
    db,
    ...context,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  // Here you can add authentication logic, for example:
  // if (!ctx.user) {
  //   throw new Error("Unauthorized");
  // }
  return next({
    ctx: {
      ...ctx,
      // Add user or other context properties here
    },
  });
}
);
