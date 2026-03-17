import { 
  Bot, 
  MessageSquare, 
  FileText, 
  RefreshCw, 
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

interface LogEntry {
  id: string;
  time: string;
  type: 'action' | 'analysis' | 'alert' | 'sync';
  message: string;
  details?: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export function ActivityLog({ data }: { data?: any[] }) {
  const defaultLogs: LogEntry[] = [
    {
      id: "1",
      time: "Il y a 10 min",
      type: "action",
      message: "Facture FC-2026-042 générée depuis le bon de commande #892",
      status: "success"
    },
    {
      id: "2",
      time: "Il y a 45 min",
      type: "alert",
      message: "Anomalie détectée : Écart de stock sur 'Clavier Mécanique V2'",
      details: "Odoo (-5 unités) vs Inventaire Physique. Ajustement en attente.",
      status: "warning"
    },
    {
      id: "3",
      time: "Il y a 1h",
      type: "analysis",
      message: "Analyse des ventes du jour terminée.",
      details: "Top produit : 'Souris Ergo Pro'.",
      status: "info"
    }
  ];

  const logs = data && data.length > 0 ? data.map(l => ({
    id: l.id,
    time: new Date(l.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    type: l.action_type as any,
    message: l.description,
    status: l.severity === 'error' ? 'error' : l.severity === 'warning' ? 'warning' : 'success'
  } as LogEntry)) : defaultLogs;

  const getIcon = (type: string, status: string) => {
    switch (type) {
      case 'action': return <MessageSquare className={`h-4 w-4 ${status === 'success' ? 'text-emerald-500' : 'text-blue-500'}`} />;
      case 'analysis': return <FileText className="h-4 w-4 text-purple-500" />;
      case 'sync': return <RefreshCw className="h-4 w-4 text-blue-500" />;
      case 'alert': return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default: return <Bot className="h-4 w-4 text-zinc-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Bot className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
          Activité de l'Agent IA
        </h3>
        <span className="text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 px-2 py-1 rounded-full">
          En direct
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 relative">
        <div className="absolute top-5 bottom-5 left-8 w-px bg-zinc-200 dark:bg-zinc-800"></div>
        
        <div className="space-y-6">
          {logs.map((log) => (
            <div key={log.id} className="relative pl-10">
              <div className="absolute left-[-11px] mt-1 bg-white dark:bg-zinc-950 p-1 rounded-full border border-zinc-200 dark:border-zinc-700 z-10">
                {getIcon(log.type, log.status)}
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
                  {log.message}
                </span>
                <span className="text-xs text-zinc-500 whitespace-nowrap">
                  {log.time}
                </span>
              </div>
              
              {log.details && (
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 pb-2">
                  {log.details}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
