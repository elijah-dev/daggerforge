"use client";

import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const { setTheme, systemTheme } = useTheme();
  const [checked, setChecked] = useState(false);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    setTheme(checked ? "dark" : "light");
  };

  useEffect(() => {
    const isDarkMode = systemTheme === "dark";
    setChecked(isDarkMode);
  }, [systemTheme]);

  return (
    <Switch
      checked={checked}
      aria-checked={checked}
      onCheckedChange={handleChange}
    />
  );
};
