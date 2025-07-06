import { adversariesRouter } from "./routers/adversaries";
import { usersRouter } from "./routers/users";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  users: usersRouter,
  adversaries: adversariesRouter,
});

export type AppRouter = typeof appRouter;
