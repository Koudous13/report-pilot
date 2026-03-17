import { IntegrationGrid } from "@/components/dashboard/IntegrationGrid";

export default function IntegrationsPage() {
  return (
    <div className="p-8 max-w-[1200px] mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Sources & Intégrations</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Gérez l'état des connexions entre ReportPilot et vos outils d'entreprise.
        </p>
      </div>

      <IntegrationGrid />
    </div>
  );
}
