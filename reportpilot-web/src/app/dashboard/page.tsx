"use client";

import { useEffect, useState } from "react";
import { TopBanner } from "@/components/dashboard/TopBanner";
import { KPICards } from "@/components/dashboard/KPICards";
import { ActivityLog } from "@/components/dashboard/ActivityLog";
import { ActionInsights } from "@/components/dashboard/ActionInsights";
import { Loader2, AlertCircle, RefreshCcw } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/dashboard/summary');
      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || `Erreur serveur (${res.status})`);
      }
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      console.error("Dashboard error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
        <p className="text-zinc-500 text-sm font-medium animate-pulse">Initialisation de la Control Room...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-[600px] mx-auto mt-20">
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-8 text-center">
          <div className="h-16 w-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Impossible de charger les données</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 whitespace-pre-wrap">
            {error}
          </p>
          <button 
            onClick={fetchSummary}
            className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            <RefreshCcw className="h-4 w-4" />
            Réessayer
          </button>
        </div>
        <p className="text-center text-xs text-zinc-500 mt-6 leading-relaxed">
          Astuce : Si l'erreur est "Non autorisé", assurez-vous d'être bien connecté.<br/>
          Si vous voyez "Table not found", vérifiez que le script SQL a été exécuté.
        </p>
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
