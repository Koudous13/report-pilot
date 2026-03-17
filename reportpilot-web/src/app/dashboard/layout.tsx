import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-[#0a0a0a]">
      <Sidebar />
      <main className="flex-1 pl-64">
        {children}
      </main>
    </div>
  );
}
