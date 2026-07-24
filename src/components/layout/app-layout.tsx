import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-svh bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1 md:pb-0">
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
