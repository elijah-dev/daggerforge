import {
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Switch } from "./ui/switch";

type SwitchFieldProps = {
  label?: string;
  className?: string;
  labelClassName?: string;
};

export const SwitchField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  className,
  labelClassName,
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & SwitchFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormMessage>&nbsp;</FormMessage>
        </FormItem>
      )}
    />
  );
};
