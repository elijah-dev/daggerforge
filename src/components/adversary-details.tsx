import { adversaryFormPlaceholders } from "@/constants/placeholders";
import { cn } from "@/lib/utils";
import { AdversaryTypes } from "@/zod/adversary";
import { Experience } from "@/zod/experience";
import { Feature } from "@/zod/feature";
import capitalize from "lodash/capitalize";
import sanitizeHtml from "sanitize-html";

const formatThresholds = (major?: number, severe?: number) => {
  if (!major && !severe) {
    return "None";
  }

  if (major && !severe) {
    return `${major}/None`;
  }

  return `${major}/${severe}`;
};

type AdversaryDetailsProps = {
  name?: string;
  tier?: number;
  type?: AdversaryTypes;
  description?: string;
  motivesAndTactics?: string[];
  difficulty?: number;
  majorThreshold?: number;
  severeThreshold?: number;
  hp?: number;
  stress?: number;
  attackModifier?: number;
  attackName?: string;
  attackRange?: string;
  attackDamage?: string;
  attackDamageType?: string;
  creaturesPerHp?: number;
  experiences?: Partial<Experience>[];
  features?: Partial<Feature>[];
};

export const AdversaryDetails = (props: AdversaryDetailsProps) => {
  const {
    name,
    tier,
    type,
    description,
    motivesAndTactics,
    difficulty,
    majorThreshold,
    severeThreshold,
    hp,
    stress,
    attackModifier,
    attackName,
    attackRange,
    attackDamage,
    attackDamageType,
    creaturesPerHp,
    experiences,
    features,
  } = props;

  const filteredExperiences =
    experiences?.filter((exp) => exp.name && exp.value) ?? [];

  const filteredFeatures = features?.filter((feat) => feat.name) ?? [];

  return (
    <div className="flex flex-col gap-2">
      <h2
        className={cn(
          "text-lg font-semibold min-h-[28px]",
          !name && "text-muted-foreground"
        )}
      >
        {(name || adversaryFormPlaceholders.name).toUpperCase()}
      </h2>
      <div className="font-semibold text-sm italic flex gap-1 min-h-[20px]">
        {!!tier && <span>Tier {tier}</span>}
        {type && <span>{capitalize(type)}</span>}
        {creaturesPerHp ? <span>({creaturesPerHp}/HP)</span> : ""}
      </div>
      <p
        className={cn(
          "text-sm italic",
          !description && "text-muted-foreground"
        )}
      >
        {description || adversaryFormPlaceholders.description}
      </p>
      <p className="text-sm flex gap-1 flex-wrap">
        <span className="font-semibold">Motives & Tactics:</span>
        {motivesAndTactics?.length
          ? capitalize(motivesAndTactics.join(", "))
          : ""}
      </p>
      <div className="text-sm flex flex-col gap-0.5 border-y-2 px-2 py-1 border-border bg-background">
        <div className="mt-1">
          <span className="font-semibold">Difficulty:</span> {difficulty} |{" "}
          <span className="font-semibold">Thresholds:</span>{" "}
          {formatThresholds(majorThreshold, severeThreshold)} |{" "}
          <span className="font-semibold">HP:</span> {hp} |{" "}
          <span className="font-semibold">Stress:</span> {stress}
        </div>
        <div className="mb-1">
          <span className="font-semibold">ATK:</span> +{attackModifier} |{" "}
          <span className="font-semibold">
            {attackName || adversaryFormPlaceholders.attackName}:
          </span>{" "}
          {attackRange ?? ""} | {attackDamage}{" "}
          {attackDamageType ? attackDamageType.substring(0, 3) : ""}
        </div>
        {filteredExperiences.length ? (
          <div className="border-t mb-1 pt-1">
            <span className="font-semibold">Experience: </span>
            {filteredExperiences
              .map((exp) => `${capitalize(exp.name)} +${exp.value}`)
              .join(", ")}
          </div>
        ) : (
          ""
        )}
      </div>
      {filteredFeatures.length ? (
        <div>
          <h4 className="font-semibold block mb-2">FEATURES</h4>
          {filteredFeatures.map((feature) => (
            <div key={feature.name} className="mb-1 pb-1 border-b last:border-0 last:mb-0 last:pb-0">
              <span className="font-semibold italic">
                {capitalize(feature.name)} - {capitalize(feature.type)}:
              </span>
              <div
                className="[&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mt-1 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mt-1 font-extralight [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(feature.description ?? ""),
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
