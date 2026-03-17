"use client";

import { useState } from "react";
import { RefreshCcw, MoreVertical, Database, CreditCard, ShoppingBag, Mail, AlertTriangle } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  category: string;
  status: 'connected' | 'error' | 'syncing';
  lastSync: string;
  icon: React.ElementType;
}

export function IntegrationGrid() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "odoo",
      name: "Odoo ERP",
      category: "Comptabilité & Inventaire",
      status: "connected",
      lastSync: "Il y a 2 min",
      icon: Database
    },
    {
      id: "stripe",
      name: "Stripe",
      category: "Paiements",
      status: "connected",
      lastSync: "Il y a 10 min",
      icon: CreditCard
    },
    {
      id: "shopify",
      name: "Shopify",
      category: "E-commerce",
      status: "error",
      lastSync: "Échec il y a 1h",
      icon: ShoppingBag
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      category: "Marketing",
      status: "connected",
      lastSync: "Hier",
      icon: Mail
    }
  ]);

  const handleSync = (id: string) => {
    // Transformer l'état en "syncing"
    setIntegrations(integrations.map(inv => 
      inv.id === id ? { ...inv, status: 'syncing' } : inv
    ));

    // Simuler la fin de la synchronisation après 2 secondes
    setTimeout(() => {
      setIntegrations(integrations.map(inv => 
        inv.id === id ? { ...inv, status: 'connected', lastSync: 'À l\'instant' } : inv
      ));
    }, 2000);
  };

  const StatusBadge = ({ status }: { status: Integration['status'] }) => {
    switch (status) {
      case 'connected':
        return (
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Connecté
          </span>
        );
      case 'error':
        return (
          <span className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2.5 py-1 rounded-full border border-red-200 dark:border-red-500/20">
            <AlertTriangle className="h-3 w-3" />
            Erreur App
          </span>
        );
      case 'syncing':
        return (
          <span className="flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-500/20">
            <RefreshCcw className="h-3 w-3 animate-spin" />
            Synchro...
          </span>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {integrations.map((integration) => {
        const Icon = integration.icon;
        
        return (
          <div 
            key={integration.id} 
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col"
          >
            {/* Ligne d'état décorative en haut de la carte */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${
              integration.status === 'connected' ? 'bg-emerald-500' :
              integration.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
            }`} />

            <div className="flex justify-between items-start mb-6 mt-2">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{integration.name}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{integration.category}</p>
                </div>
              </div>
              <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
                <MoreVertical className="h-4 w-4 text-zinc-400" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
              <div className="flex flex-col gap-2">
                <StatusBadge status={integration.status} />
                <span className="text-[10px] text-zinc-500 font-medium pl-1">
                  Dernier contact {integration.lastSync}
                </span>
              </div>
              
              <button 
                onClick={() => handleSync(integration.id)}
                disabled={integration.status === 'syncing'}
                className="flex items-center justify-center h-10 w-10 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors disabled:opacity-50"
                title="Synchroniser maintenant"
              >
                <RefreshCcw className={`h-4 w-4 text-zinc-600 dark:text-zinc-400 ${integration.status === 'syncing' ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        );
      })}

      {/* Carte "Ajouter une intégration" */}
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center p-6 text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-pointer min-h-[220px] bg-zinc-50/50 dark:bg-zinc-950/50">
        <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-3">
          <Database className="h-5 w-5" />
        </div>
        <span className="font-medium text-sm">Ajouter une connexion</span>
        <span className="text-xs mt-1 text-center max-w-[200px]">Connectez de nouvelles sources de données à ReportPilot</span>
      </div>
    </div>
  );
}
