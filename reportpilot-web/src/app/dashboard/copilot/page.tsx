import { ChatInterface } from "@/components/dashboard/ChatInterface";

export default function CopilotPage() {
  return (
    <div className="p-8 max-w-[1200px] mx-auto h-[calc(100vh-2rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Le Bureau de l'IA</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Posez vos questions à ReportPilot. L'IA a accès en temps réel à l'ensemble de vos données d'entreprise.
        </p>
      </div>

      <div className="flex-1 min-h-0 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <ChatInterface />
      </div>
    </div>
  );
}
