import "server-only"; // <-- ensure this file cannot be imported from the client
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";
import { makeQueryClient } from "./make-query-client";
import { createTRPCContext } from "@/server/api/trpc";
import { appRouter } from "@/server/api/root";
import { headers } from "next/headers";

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
  ctx: async () => {
    const heads = await headers();

    return createTRPCContext({ headers: heads });
  },
  router: appRouter,
  queryClient: getQueryClient,
});
