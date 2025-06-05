import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        Daggerforge
        <ThemeSwitcher />
      </header>
      {children}
    </>
  );
}
