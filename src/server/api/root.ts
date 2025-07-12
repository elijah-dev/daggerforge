import { adversariesRouter } from "./routers/adversaries";
import { sourcesRouter } from "./routers/sources";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  adversaries: adversariesRouter,
  sources: sourcesRouter,
});

export type AppRouter = typeof appRouter;
