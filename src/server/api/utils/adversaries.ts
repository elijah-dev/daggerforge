import { SelectAdversary } from "@/server/db/schema/adversaries";
import { SelectExperience } from "@/server/db/schema/experiences";
import { SelectFeature } from "@/server/db/schema/features";
import { SelectMotiveTactic } from "@/server/db/schema/motives-tactics";
import { adversarySchema } from "@/zod/adversary";
import z from "zod";

export const prepareAdversaryInsert = (
  adversary: z.infer<typeof adversarySchema>,
  user: { id?: string }
) => {
  return {
    name: adversary.name,
    tier: Number(adversary.tier),
    type: adversary.type,
    creatures_per_hp: adversary.creaturesPerHp ?? 0,
    description: adversary.description ?? "",
    difficulty: adversary.difficulty,
    major_threshold: adversary.majorThreshold,
    severe_threshold: adversary.severeThreshold,
    hp: adversary.hp,
    stress: adversary.stress,
    attack_modifier: adversary.attackModifier ?? 0,
    attack_name: adversary.attackName ?? "",
    attack_range: adversary.attackRange,
    attack_damage: `${adversary.attackDamageDieCount ?? 1}d${
      adversary.attackDamageDie ?? 6
    }${
      adversary.attackDamageModifier
        ? `+${Math.abs(adversary.attackDamageModifier)}`
        : ""
    }`,
    attack_damage_type: adversary.attackDamageType,
    is_public: adversary.public ?? false,
    created_by: user.id,
  };
};

export const groupAdversaries = (
  data: {
    adversaries: SelectAdversary;
    motives_tactics: SelectMotiveTactic | null;
    experiences: SelectExperience | null;
    features: SelectFeature | null;
  }[]
) => {
  const grouped: Record<
    string,
    SelectAdversary & {
      motivesAndTactics: SelectMotiveTactic[];
      experiences: SelectExperience[];
      features: SelectFeature[];
    }
  > = {};

  data.forEach((item) => {
    const { adversaries, motives_tactics, experiences, features } = item;
    if (!grouped[adversaries.id]) {
      grouped[adversaries.id] = {
        ...adversaries,
        motivesAndTactics: [],
        experiences: [],
        features: [],
      };
    }

    if (motives_tactics) {
      grouped[adversaries.id].motivesAndTactics.push(motives_tactics);
    }

    if (experiences) {
      grouped[adversaries.id].experiences.push(experiences);
    }

    if (features) {
      grouped[adversaries.id].features.push(features);
    }
  });

  return Object.values(grouped).sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
};
