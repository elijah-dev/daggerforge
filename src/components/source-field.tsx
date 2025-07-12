import {
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { SelectField } from "./select-field";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const SourceField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  className,
  triggerClassName,
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  className?: string;
  triggerClassName?: string;
}) => {
  const trpc = useTRPC();
  const { data, isPending } = useQuery(trpc.sources.getAll.queryOptions());

  const options =
    data?.map((source) => ({
      value: source.id,
      label: source.name,
    })) || [];

  return (
    <SelectField
      control={control}
      name={name}
      label="Source"
      placeholder="Select a source"
      options={options}
      disabled={isPending}
      className={className}
      triggerClassName={triggerClassName}
    />
  );
};
