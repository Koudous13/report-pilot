import { Check, X, AlertCircle } from "lucide-react";

interface InsightAction {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  source: string;
}

export function ActionInsights() {
  const insights: InsightAction[] = [
    {
      id: "a1",
      title: "Validation requise : Nouvelle Duree",
      description: "Le client 'TechCorp' demande un délai de 60j pour la facture FC-102. L'IA recommande d'accepter (Historique de paiement : Excellent).",
      priority: "high",
      source: "Odoo ERP"
    },
    {
      id: "a2",
      title: "Rupture de stock imminente",
      description: "L'article 'Tonner XL' sera épuisé dans 3 jours selon les prévisions de vente. Voulez-vous générer un bon de commande fournisseur ?",
      priority: "medium",
      source: "Inventaire"
    }
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          Actions Requises
        </h3>
        <span className="text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 px-2 py-1 rounded-full">
          2 en attente
        </span>
      </div>

      <div className="divide-y divide-zinc-200 dark:divide-zinc-800 flex-1 overflow-y-auto">
        {insights.map((insight) => (
          <div key={insight.id} className="p-5 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {insight.title}
                  </h4>
                  {insight.priority === 'high' && (
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                  )}
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {insight.description}
                </p>
                <div className="pt-2 flex items-center text-xs text-zinc-500 font-medium">
                  Source: <span className="ml-1 px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">{insight.source}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 rounded-lg transition-colors shadow-sm">
                <Check className="h-4 w-4" />
                Approuver
              </button>
              <button className="flex items-center justify-center p-2 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {insights.length === 0 && (
          <div className="p-8 text-center flex flex-col items-center justify-center h-full">
            <CheckCircle2 className="h-12 w-12 text-emerald-500/50 mb-3" />
            <p className="text-sm text-zinc-500 font-medium">Aucune action requise pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
