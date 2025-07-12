import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDamageString = (
  dieCount: number,
  dieSize: number,
  modifier?: number
): string => {
  let damageString = `${dieCount}d${dieSize}`;
  if (modifier) {
    damageString += `+${modifier}`;
  }
  return damageString;
};

export const castToNumber = (
  value: string | number | null | undefined,
  fallback = 0
): number => {
  if (typeof value === "number") {
    return value;
  }

  if (!value) {
    return fallback;
  }

  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? fallback : parsedValue;
};

export const filterDefined = <T>(
  array: (T | undefined)[]
): T[] => {
  return array.filter((item): item is T => item !== undefined);
};


