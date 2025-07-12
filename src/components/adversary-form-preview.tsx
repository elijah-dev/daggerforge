"use client";

import { adversaryFormAtom } from "@/atoms/forms";
import { AdversaryDetails } from "./adversary-details";
import { Card } from "./ui/card";
import { useAtomValue } from "jotai";
import {
  castToNumber,
  cn,
  filterDefined,
  formatDamageString,
} from "@/lib/utils";

type AdversaryFormPreviewProps = {
  className?: string;
};

export const AdversaryFormPreview = ({
  className,
}: AdversaryFormPreviewProps) => {
  const adversaryForm = useAtomValue(adversaryFormAtom);

  return (
    <Card className={cn("py-2.5 px-2", className)}>
      <AdversaryDetails
        name={adversaryForm?.name}
        tier={castToNumber(adversaryForm?.tier)}
        type={adversaryForm?.type}
        description={adversaryForm?.description}
        motivesAndTactics={filterDefined(
          adversaryForm?.motivesAndTactics ?? []
        )}
        difficulty={adversaryForm?.difficulty}
        majorThreshold={adversaryForm?.majorThreshold}
        severeThreshold={adversaryForm?.severeThreshold}
        hp={adversaryForm?.hp}
        stress={adversaryForm?.stress}
        attackModifier={adversaryForm?.attackModifier}
        attackName={adversaryForm?.attackName}
        attackRange={adversaryForm?.attackRange}
        attackDamage={formatDamageString(
          adversaryForm?.attackDamageDieCount ?? 1,
          castToNumber(adversaryForm?.attackDamageDie, 6),
          adversaryForm?.attackDamageModifier
        )}
        attackDamageType={adversaryForm?.attackDamageType}
        creaturesPerHp={adversaryForm?.creaturesPerHp}
        experiences={filterDefined(adversaryForm?.experiences ?? [])}
        features={filterDefined(adversaryForm?.features ?? [])}
      />
    </Card>
  );
};
