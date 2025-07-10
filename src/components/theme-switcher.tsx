"use client";

import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

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
    <div className="flex items-center gap-2 [&_svg]:w-5 [&_svg]:h-5 [&_svg]:text-muted-foreground">
      <Sun />
      <Switch
        checked={checked}
        aria-checked={checked}
        onCheckedChange={handleChange}
      />
      <Moon />
    </div>
  );
};
