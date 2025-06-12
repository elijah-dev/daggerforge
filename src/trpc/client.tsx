"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { makeQueryClient } from "./make-query-client";
import { useState } from "react";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@/server/api/root";
import superjson from "superjson";

let queryClientSingleton: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  if (!queryClientSingleton) {
    queryClientSingleton = makeQueryClient();
  }

  return queryClientSingleton;
};

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();

export function TRPCClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  const [trcpClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          transformer: superjson,
        }),
      ],
    })
  );

  return (
    <TRPCProvider trpcClient={trcpClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TRPCProvider>
  );
}
