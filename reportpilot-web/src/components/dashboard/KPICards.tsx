import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ShoppingCart, 
  CreditCard,
  DollarSign
} from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
  source: string;
}

const KPICard = ({ title, value, change, trend, icon: Icon, source }: KPICardProps) => {
  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</h3>
        <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
          <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
        </div>
      </div>
      <div>
        <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{value}</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className={`flex items-center text-xs font-medium space-x-1 ${
          trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 
          trend === 'down' ? 'text-red-600 dark:text-red-400' : 
          'text-zinc-500'
        }`}>
          {trend === 'up' && <TrendingUp className="h-3 w-3" />}
          {trend === 'down' && <TrendingDown className="h-3 w-3" />}
          <span>{change}</span>
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">
          {source}
        </div>
      </div>
    </div>
  );
};

export function KPICards({ data }: { data?: any }) {
  const kpis: KPICardProps[] = [
    {
      title: "Chiffre d'Affaires T.",
      value: data?.income ? `${data.income.toLocaleString()} FCFA` : "0 FCFA",
      change: data?.income ? "Temps réel" : "En attente de données",
      trend: "neutral",
      icon: DollarSign,
      source: "Odoo ERP"
    },
    {
      title: "Trésorerie Actuelle",
      value: data?.balance ? `${data.balance.toLocaleString()} FCFA` : "0 FCFA",
      change: "Calculé",
      trend: "neutral",
      icon: Wallet,
      source: "Compte Pro"
    },
    {
      title: "Créances Clients",
      value: "N/A",
      change: "Pas de données",
      trend: "neutral",
      icon: CreditCard,
      source: "Facturation"
    },
    {
      title: "Volume Transactions",
      value: data?.transactionsCount ? `${data.transactionsCount}` : "0",
      change: data?.transactionsCount ? "Total" : "Aucune transaction",
      trend: "neutral",
      icon: ShoppingCart,
      source: "Système"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => (
        <KPICard key={idx} {...kpi} />
      ))}
    </div>
  );
}
