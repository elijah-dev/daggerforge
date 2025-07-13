import { castToNumber, formatDamageString, includesBy } from "@/lib/utils";
import { SelectAdversary } from "@/server/db/schema/adversaries";
import { SelectAdversariesMotivesTactics } from "@/server/db/schema/adversaries-motives-tactics";
import { SelectExperience } from "@/server/db/schema/experiences";
import { SelectFeature } from "@/server/db/schema/features";
import { SelectMotiveTactic } from "@/server/db/schema/motives-tactics";
import { AdversaryForm } from "@/zod/adversary";

export const prepareAdversaryInsert = (
  adversary: AdversaryForm,
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
    attack_damage: formatDamageString(
      adversary.attackDamageDieCount,
      castToNumber(adversary.attackDamageDie, 6),
      adversary.attackDamageModifier
    ),
    attack_damage_type: adversary.attackDamageType,
    is_public: adversary.public ?? false,
    created_by: user.id,
    source: adversary.source || null,
  };
};

export const groupAdversaries = (
  data: {
    adversaries: SelectAdversary;
    adversaries_motives_tactics: SelectAdversariesMotivesTactics | null;
    motives_tactics: SelectMotiveTactic | null;
    experiences: SelectExperience | null;
    features: SelectFeature | null;
  }[]
) => {
  const grouped: Record<
    string,
    SelectAdversary & {
      motivesAndTactics: (SelectMotiveTactic & { order?: number })[];
      experiences: SelectExperience[];
      features: SelectFeature[];
    }
  > = {};

  data.forEach((item) => {
    const {
      adversaries,
      motives_tactics,
      adversaries_motives_tactics,
      experiences,
      features,
    } = item;

    if (!grouped[adversaries.id]) {
      grouped[adversaries.id] = {
        ...adversaries,
        motivesAndTactics: [],
        experiences: [],
        features: [],
      };
    }

    const mt = grouped[adversaries.id].motivesAndTactics;
    const exp = grouped[adversaries.id].experiences;
    const feats = grouped[adversaries.id].features;

    if (motives_tactics && !includesBy(mt, "id", motives_tactics.id)) {
      mt.push({
        ...motives_tactics,
        order: adversaries_motives_tactics?.order,
      });
      mt.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }

    if (experiences && !includesBy(exp, "id", experiences.id)) {
      exp.push(experiences);
      exp.sort((a, b) => a.order - b.order);
    }

    if (features && !includesBy(feats, "id", features.id)) {
      feats.push(features);
      feats.sort((a, b) => a.order - b.order);
    }
  });

  return Object.values(grouped).sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
};
