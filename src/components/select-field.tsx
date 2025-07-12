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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type SelectFieldProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  triggerClassName?: string;
  options: { value: string | number; label: string }[];
};

export const SelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder,
  options,
  className,
  labelClassName,
  triggerClassName,
  disabled
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & SelectFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
            <Select
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger className={triggerClassName}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
              <FormMessage>&nbsp;</FormMessage>
            </Select>
          </FormItem>
        );
      }}
    />
  );
};
