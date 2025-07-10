import { useFieldArray } from "react-hook-form";
import { FeatureFormBlock } from "./feature-form-block";
import { Button } from "./ui/button";
import { featureTypesEnum } from "@/zod/feature";

type FeatureFormBlockListProps = {
  name: string;
};

export const FeatureFormBlockList = ({ name }: FeatureFormBlockListProps) => {
  const { fields, append } = useFieldArray({
    name,
  });

  return (
    <div className="space-y-2 mb-8">
      {fields.map((field, index) => (
        <FeatureFormBlock key={field.id} name={name} index={index} />
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ name: "", type: featureTypesEnum.Enum.action })}
      >
        Add Feature
      </Button>
    </div>
  );
};
