import { AppLayout } from "@/components/layout/app-layout";

export default function Home({ children }: { children: React.ReactNode }) {
    return (
        <AppLayout>
            {children}
        </AppLayout>
    )
}