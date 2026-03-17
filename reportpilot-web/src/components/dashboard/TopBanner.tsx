import { ShieldCheck, AlertTriangle, AlertCircle } from "lucide-react";

interface TopBannerProps {
  status: 'healthy' | 'warning' | 'critical';
  lastSync: string;
}

export function TopBanner({ status, lastSync }: TopBannerProps) {
  const config = {
    healthy: {
      icon: ShieldCheck,
      title: "Système Sain",
      description: "Toutes les sources sont synchronisées. L'IA surveille en arrière-plan.",
      colors: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      iconColor: "text-emerald-500"
    },
    warning: {
      icon: AlertTriangle,
      title: "Vigilance Requise",
      description: "Certaines actions nécessitent votre attention ou une source est désynchronisée.",
      colors: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      iconColor: "text-amber-500"
    },
    critical: {
      icon: AlertCircle,
      title: "Action Immédiate Requise",
      description: "Une anomalie majeure a été détectée dans le flux de trésorerie.",
      colors: "bg-red-500/10 text-red-600 border-red-500/20",
      iconColor: "text-red-500"
    }
  };

  const activeConfig = config[status];
  const Icon = activeConfig.icon;

  return (
    <div className={`rounded-xl border p-4 ${activeConfig.colors} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300`}>
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg bg-white/50 dark:bg-black/20 ${activeConfig.iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-base font-semibold">{activeConfig.title}</h2>
          <p className="text-sm opacity-80 mt-0.5">{activeConfig.description}</p>
        </div>
      </div>
      <div className="text-sm font-medium opacity-70 whitespace-nowrap">
        Dernière synchro : {lastSync}
      </div>
    </div>
  );
}
