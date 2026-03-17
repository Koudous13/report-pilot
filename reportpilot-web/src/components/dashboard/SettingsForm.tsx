"use client";

import { useState } from "react";
import { MessageCircle, Bell, Shield, Smartphone, ArrowRight, Save } from "lucide-react";

export function SettingsForm() {
  const [iaLevel, setIaLevel] = useState('standard');
  const [whatsappNumber, setWhatsappNumber] = useState('+22900000000');
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Colonne de gauche : Navigation des paramètres (Statique pour MVP) */}
      <div className="lg:col-span-1 space-y-2">
        <button className="w-full flex items-center justify-between p-3 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 font-medium border border-emerald-200 dark:border-emerald-500/20">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-4 w-4" />
            Comportement IA
          </div>
          <ArrowRight className="h-4 w-4 opacity-50" />
        </button>
        <button className="w-full flex items-center justify-between p-3 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium transition-colors">
          <div className="flex items-center gap-3">
            <Smartphone className="h-4 w-4" />
            Connexion WhatsApp
          </div>
        </button>
        <button className="w-full flex items-center justify-between p-3 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium transition-colors">
          <div className="flex items-center gap-3">
            <Bell className="h-4 w-4" />
            Règles d'Alerte
          </div>
        </button>
        <button className="w-full flex items-center justify-between p-3 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium transition-colors">
          <div className="flex items-center gap-3">
            <Shield className="h-4 w-4" />
            Sécurité & Accès
          </div>
        </button>
      </div>

      {/* Colonne de droite : Formulaire */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Niveau d'intervention de l'IA</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            Définissez la fréquence à laquelle ReportPilot est autorisé à vous solliciter sur WhatsApp.
          </p>

          <div className="space-y-4">
            <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              iaLevel === 'silencieux' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'border-zinc-200 dark:border-zinc-800 hover:border-emerald-200 dark:hover:border-emerald-900'
            }`}>
              <div className="mt-0.5">
                <input 
                  type="radio" 
                  name="ia_level" 
                  value="silencieux" 
                  checked={iaLevel === 'silencieux'}
                  onChange={() => setIaLevel('silencieux')}
                  className="w-4 h-4 text-emerald-600 bg-zinc-100 border-zinc-300 focus:ring-emerald-500"
                />
              </div>
              <div>
                <span className="block font-medium text-zinc-900 dark:text-zinc-100">Silencieux (Urgences & Approbations)</span>
                <span className="block text-sm text-zinc-500 dark:text-zinc-400 mt-1">L'IA ne vous contacte que si votre validation est requise pour une action bloquante ou en cas d'alerte critique.</span>
              </div>
            </label>

            <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              iaLevel === 'standard' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'border-zinc-200 dark:border-zinc-800 hover:border-emerald-200 dark:hover:border-emerald-900'
            }`}>
              <div className="mt-0.5">
                <input 
                  type="radio" 
                  name="ia_level" 
                  value="standard" 
                  checked={iaLevel === 'standard'}
                  onChange={() => setIaLevel('standard')}
                  className="w-4 h-4 text-emerald-600 bg-zinc-100 border-zinc-300 focus:ring-emerald-500"
                />
              </div>
              <div>
                <span className="block font-medium text-zinc-900 dark:text-zinc-100">Standard (Recommandé)</span>
                <span className="block text-sm text-zinc-500 dark:text-zinc-400 mt-1">Rapport de synthèse quotidien le matin, résumé des anomalies en fin de journée et alertes en temps réel.</span>
              </div>
            </label>

            <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              iaLevel === 'explicatif' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'border-zinc-200 dark:border-zinc-800 hover:border-emerald-200 dark:hover:border-emerald-900'
            }`}>
              <div className="mt-0.5">
                <input 
                  type="radio" 
                  name="ia_level" 
                  value="explicatif" 
                  checked={iaLevel === 'explicatif'}
                  onChange={() => setIaLevel('explicatif')}
                  className="w-4 h-4 text-emerald-600 bg-zinc-100 border-zinc-300 focus:ring-emerald-500"
                />
              </div>
              <div>
                <span className="block font-medium text-zinc-900 dark:text-zinc-100">Proactif & Documenté</span>
                <span className="block text-sm text-zinc-500 dark:text-zinc-400 mt-1">L'IA vulgarise chaque point de données, propose des stratégies d'optimisation et vous interroge activement.</span>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Canal de Notification</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Numéro WhatsApp Administrateur</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Smartphone className="h-4 w-4 text-zinc-400" />
                </div>
                <input 
                  type="tel" 
                  id="whatsapp" 
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="pl-10 w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-3 py-2 text-sm outline-none transition-all"
                />
              </div>
              <p className="text-xs text-zinc-500 mt-2">C'est sur ce numéro que ReportPilot enverra ses analyses par via GreenAPI.</p>
            </div>
            
            <div className="pt-4 flex justify-end">
              <button className="flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                <Save className="h-4 w-4" />
                Enregistrer les préférences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
