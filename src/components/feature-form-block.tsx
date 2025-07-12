import { useFormContext } from "react-hook-form";
import { TextField } from "./text-field";
import { SelectField } from "./select-field";
import { featureTypesEnum } from "@/zod/feature";
import { TextEditorField } from "./text-editor-field";
import { adversaryFormPlaceholders } from "@/constants/placeholders";
import { Card } from "./ui/card";
import { useEffect, useRef } from "react";

type FeatureFormBlockProps = {
  name: string;
  index: number;
};

const featureTypeOptions = featureTypesEnum.options.map((type) => ({
  value: type,
  label: type.charAt(0).toUpperCase() + type.slice(1),
}));

export const FeatureFormBlock = ({ name, index }: FeatureFormBlockProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { control } = useFormContext();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <Card ref={ref} className="flex flex-col space-y-2 p-4">
      <div className="flex items-center gap-2">
        <TextField
          control={control}
          name={`${name}.${index}.name`}
          label="Feature Name"
          placeholder={adversaryFormPlaceholders.featureName}
          className="w-[200%]"
        />
        <SelectField
          control={control}
          name={`${name}.${index}.type`}
          label="Feature Type"
          options={featureTypeOptions}
          className="w-full"
          triggerClassName="w-full"
        />
      </div>
      <TextEditorField
        control={control}
        name={`${name}.${index}.description`}
        label="Feature Description"
      />
    </Card>
  );
};
