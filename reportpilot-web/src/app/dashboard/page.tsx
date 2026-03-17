"use client";

import { useEffect, useState } from "react";
import { TopBanner } from "@/components/dashboard/TopBanner";
import { KPICards } from "@/components/dashboard/KPICards";
import { ActivityLog } from "@/components/dashboard/ActivityLog";
import { ActionInsights } from "@/components/dashboard/ActionInsights";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch('/api/dashboard/summary');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard summary", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Vue d'ensemble</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Bienvenue dans votre Control Room. Le système est surveillé en temps réel par ReportPilot.
        </p>
      </div>

      <TopBanner 
        status={data?.recentLogs?.some((l: any) => l.severity === 'error') ? 'critical' : 'healthy'} 
        lastSync={data?.recentLogs?.[0] ? new Date(data.recentLogs[0].created_at).toLocaleString('fr-FR') : "À l'instant"} 
      />

      <KPICards data={data?.kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
        <ActivityLog data={data?.recentLogs} />
        <ActionInsights />
      </div>
    </div>
  );
}
