import { getQueryClient, trpc } from "@/trpc/server";
import { Users } from "./users";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function Adversaries() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.users.getAll.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Adversaries</h1>
        <Users />
      </main>
    </HydrationBoundary>
  );
}
