import { ThemeSwitcher } from "@/components/theme-switcher";
import { TRPCClientProvider } from "@/trpc/client";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <header>
        Daggerforge
        <ThemeSwitcher />
      </header>
      <TRPCClientProvider>{children}</TRPCClientProvider>
    </>
  );
}
