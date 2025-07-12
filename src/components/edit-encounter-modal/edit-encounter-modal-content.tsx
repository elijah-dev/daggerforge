import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useState } from "react";
import { AdversaryDetails } from "../adversary-details";
import { castToNumber, excludeNull } from "@/lib/utils";
import { ArrayElement } from "@/lib/util-types";
import map from "lodash/map";
import { Card } from "../ui/card";

export const EditEncounterModalContent = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.adversaries.getAll.queryOptions());
  const [selectedAdversary, setSelectedAdversary] = useState<ArrayElement<
    typeof data
  > | null>(null);

  return (
    <div className="flex items-stretch gap-4 overflow-hidden h-full">
      <div className="w-48">Filters</div>
      <div className="overflow-y-auto w-76">
        {data?.map((adversary) => (
          <div
            key={adversary.id}
            className="p-4 border-b cursor-pointer hover:bg-accent"
            onClick={() => setSelectedAdversary(adversary)}
          >
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
      <Card className="p-4 overflow-auto w-94">
        {selectedAdversary ? (
          <AdversaryDetails
            name={selectedAdversary?.name}
            tier={selectedAdversary?.tier}
            type={selectedAdversary?.type}
            description={excludeNull(selectedAdversary?.description)}
            motivesAndTactics={map(
              selectedAdversary?.motivesAndTactics,
              "name"
            )}
            difficulty={selectedAdversary?.difficulty}
            majorThreshold={castToNumber(selectedAdversary?.major_threshold)}
            severeThreshold={castToNumber(selectedAdversary?.severe_threshold)}
            hp={selectedAdversary?.hp}
            stress={selectedAdversary?.stress}
            attackModifier={selectedAdversary?.attack_modifier}
            attackName={selectedAdversary?.attack_name}
            attackRange={selectedAdversary?.attack_range}
            attackDamage={selectedAdversary?.attack_damage}
            attackDamageType={selectedAdversary?.attack_damage_type}
            creaturesPerHp={castToNumber(selectedAdversary?.creatures_per_hp)}
            experiences={selectedAdversary?.experiences || []}
            features={selectedAdversary?.features || []}
          />
        ) : (
          <div className="p-4 text-muted-foreground">
            Select an adversary to view details
          </div>
        )}
      </Card>
      <div></div>
    </div>
  );
};
