import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background [&>header]:shrink-0">
      <Navbar />
      <div className="flex min-h-0 flex-1 overflow-hidden [&>aside]:static [&>aside]:h-full">
        <Sidebar />
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto md:pb-0">
          <div className="flex h-full w-full flex-col">{children}</div>
        </main>
      </div>
    </div>
  );
}
