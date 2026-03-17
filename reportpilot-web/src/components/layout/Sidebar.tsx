import Link from "next/link";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  Blocks,
  LogOut,
  Bot
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 w-64 bg-zinc-950 text-zinc-300 border-r border-zinc-800 flex flex-col">
      <div className="flex h-16 items-center flex-shrink-0 px-6 bg-zinc-950 border-b border-zinc-800">
        <Bot className="h-6 w-6 text-emerald-500 mr-2" />
        <span className="text-lg font-bold text-zinc-100 tracking-tight">ReportPilot</span>
        <span className="ml-2 text-xs font-medium bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">v2</span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <p className="px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Control Room</p>
        
        <Link 
          href="/dashboard" 
          className="flex items-center gap-3 rounded-lg bg-zinc-900 text-zinc-100 px-3 py-2 transition-all hover:bg-zinc-800"
        >
          <LayoutDashboard className="h-4 w-4 text-emerald-500" />
          <span className="text-sm font-medium">Vue Globale</span>
        </Link>
        
        <Link 
          href="/dashboard/copilot" 
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-zinc-100 hover:bg-zinc-900"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm font-medium">Bureau IA</span>
        </Link>

        <div className="pt-6 pb-2">
          <p className="px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Système</p>
        </div>

        <Link 
          href="/dashboard/integrations" 
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-zinc-100 hover:bg-zinc-900"
        >
          <Blocks className="h-4 w-4" />
          <span className="text-sm font-medium">Sources & Outils</span>
        </Link>

        <Link 
          href="/dashboard/settings" 
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-zinc-100 hover:bg-zinc-900"
        >
          <Settings className="h-4 w-4" />
          <span className="text-sm font-medium">Paramètres</span>
        </Link>
      </div>

      <div className="p-4 border-t border-zinc-800 mt-auto">
        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
            <span className="text-xs font-bold text-zinc-300">KO</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-zinc-200">Koudous</span>
            <span className="text-xs text-zinc-500">Admin</span>
          </div>
        </div>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-red-400 hover:bg-red-500/10">
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
