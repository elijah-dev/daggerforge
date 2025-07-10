import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export const EditEncounterModalContent = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.adversaries.getAll.queryOptions());

  return (
    <div>
      {data?.map((adversary) => (
        <div key={adversary.id} className="p-4 border-b">
          <h3 className="text-lg font-semibold">{adversary.name}</h3>
          <p className="text-sm text-muted-foreground">
            Tier: {adversary.tier}, Type: {adversary.type}
          </p>
          <p className="text-sm text-muted-foreground">
            Attack Range: {adversary.attack_range}, Damage:{" "}
            {adversary.attack_damage}
          </p>
        </div>
      ))}
    </div>
  );
};
