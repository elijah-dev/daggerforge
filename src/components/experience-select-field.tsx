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

type ExperienceSelectFieldProps = {
  label?: string;
  className?: string;
  labelClassName?: string;
  max?: number;
  placeholder?: string;
};

type Experience = {
  name: string;
  value: number;
};

export const ExperienceSelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  max = Infinity,
  className = "",
  labelClassName = "",
  placeholder,
}: Omit<ControllerProps<TFieldValues, TName>, "render"> &
  ExperienceSelectFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [numberValue, setNumberValue] = useState("2");

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
                    className="w-[200%]"
                  />
                  <Input
                    type="number"
                    value={numberValue}
                    min={1}
                    max={99}
                    onChange={(e) => setNumberValue(e.target.value)}
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

                      const normalizedNumberValue = Math.round(
                        Math.abs(parseInt(numberValue, 10))
                      );

                      if (normalizedInputValue !== "") {
                        const newTags = [
                          ...(field.value || []),
                          {
                            name: normalizedInputValue.toLowerCase(),
                            value: normalizedNumberValue,
                          },
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
                    {field.value?.map(
                      (experience: Experience, index: number) => (
                        <RemovableBadge
                          key={index}
                          onRemove={() => {
                            const newTags = field.value.filter(
                              (exp: Experience) =>
                                exp.name !== experience.name &&
                                exp.value !== experience.value
                            );
                            field.onChange(newTags);
                          }}
                        >
                          {experience.name} +{experience.value}
                        </RemovableBadge>
                      )
                    )}
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
