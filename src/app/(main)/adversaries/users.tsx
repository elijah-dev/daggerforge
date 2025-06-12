"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const Users = () => {
  const trpc = useTRPC();
  const { status, data } = useQuery(trpc.users.getAll.queryOptions());

  return status === "pending" ? (
    <p>Loading...</p>
  ) : (
    <ul className="list-disc pl-5">
      {data?.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
};
