import { SettingsForm } from "@/components/dashboard/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-[1200px] mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Paramètres Système</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Configurez le comportement de l'Agent IA, vos notifications WhatsApp et vos préférences de sécurité.
        </p>
      </div>

      <SettingsForm />
    </div>
  );
}
