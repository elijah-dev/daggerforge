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
import { Input } from "./ui/input";

type NumberFieldProps = {
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
};

export const NumberField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder,
  min,
  max,
  className,
  labelClassName,
  inputClassName,
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & NumberFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              className={inputClassName}
              type="number"
              placeholder={placeholder}
              min={min}
              max={max}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          <FormMessage>&nbsp;</FormMessage>
        </FormItem>
      )}
    />
  );
};
