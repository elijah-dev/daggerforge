import { ThemeSwitcher } from "@/components/theme-switcher";
import { UserBadge } from "@/components/user-bage";
import { TRPCClientProvider } from "@/trpc/client";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TRPCClientProvider>
        <header className="h-16 flex items-center justify-between px-4 fixed top-0 left-0 right-0 bg-sidebar border-b border-border">
          <div>
            <h1 className="text-xl font-semibold">DAGGERFORGE</h1>
          </div>
          <div className="flex items-center gap-6">
            <ThemeSwitcher />
            <UserBadge />
          </div>
        </header>
        <main className="flex flex-col items-center h-full pt-16">
          {children}
        </main>
      </TRPCClientProvider>
    </SessionProvider>
  );
}
