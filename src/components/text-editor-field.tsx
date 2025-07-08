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
import { TextEditor } from "./text-editor";

type TextEditorFieldProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
};

export const TextEditorField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder,
  className,
  labelClassName,
}: Omit<ControllerProps<TFieldValues, TName>, "render"> &
  TextEditorFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
          <FormControl>
            <TextEditor
              onChange={(value) => field.onChange(value)}
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage>&nbsp;</FormMessage>
        </FormItem>
      )}
    />
  );
};
