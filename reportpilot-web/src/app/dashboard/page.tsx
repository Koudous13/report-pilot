import { TopBanner } from "@/components/dashboard/TopBanner";
import { KPICards } from "@/components/dashboard/KPICards";
import { ActivityLog } from "@/components/dashboard/ActivityLog";
import { ActionInsights } from "@/components/dashboard/ActionInsights";

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Vue d'ensemble</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Bienvenue dans votre Control Room. Le système est surveillé en temps réel par ReportPilot.
        </p>
      </div>

      <TopBanner status="warning" lastSync="Aujourd'hui, 13:45" />

      <KPICards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
        <ActivityLog />
        <ActionInsights />
      </div>
    </div>
  );
}
