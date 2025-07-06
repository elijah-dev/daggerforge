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
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { RemovableBadge } from "./removable-badge";

type TagSelectFieldProps = {
  label?: string;
  className?: string;
  labelClassName?: string;
  max?: number;
  placeholder?: string;
};

export const TagSelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  max = Infinity,
  placeholder,
  className = "",
  labelClassName = "",
}: Omit<ControllerProps<TFieldValues, TName>, "render"> &
  TagSelectFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
            <FormControl>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Input
                    ref={inputRef}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) =>
                      setInputValue(
                        e.target.value.replace(/[^a-zA-Z0-9\s]/g, "")
                      )
                    }
                  />
                  <Button
                    type="button"
                    disabled={
                      field.value?.length >= max ||
                      field.value.includes(inputValue) ||
                      inputValue.trim() === ""
                    }
                    onClick={() => {
                      const normalizedInputValue = inputValue
                        .trim()
                        .replace(/\s+/g, " ");

                      if (normalizedInputValue !== "") {
                        const newTags = [
                          ...(field.value || []),
                          normalizedInputValue,
                        ];
                        field.onChange(newTags);
                        setInputValue("");
                        inputRef.current?.focus();
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                {!!field.value?.length && (
                  <div className="flex flex-wrap gap-2">
                    {field.value?.map((tag: string, index: number) => (
                      <RemovableBadge
                        key={index}
                        onRemove={() => {
                          const newTags = field.value.filter(
                            (t: string) => t !== tag
                          );
                          field.onChange(newTags);
                        }}
                      >
                        {tag}
                      </RemovableBadge>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage>&nbsp;</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
