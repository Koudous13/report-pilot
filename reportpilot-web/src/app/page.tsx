import Link from "next/link";
import { Bot, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]"></div>
      
      <div className="z-10 text-center max-w-3xl px-6">
        <div className="flex justify-center mb-8">
          <div className="h-20 w-20 bg-zinc-900 rounded-3xl border border-zinc-800 flex items-center justify-center shadow-2xl">
            <Bot className="h-10 w-10 text-emerald-500" />
          </div>
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
          ReportPilot
        </h1>
        
        <p className="text-lg sm:text-xl text-zinc-400 mb-10 leading-relaxed">
          Le premier assistant de gestion automatique et Control Room intelligent pour les PME.
        </p>
        
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg shadow-emerald-500/20"
        >
          Accéder à la Control Room
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
