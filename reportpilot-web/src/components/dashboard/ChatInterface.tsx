"use client";

import { useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Bonjour Koudous, je suis votre CFO de poche virtuel. Comment puis-je vous aider aujourd'hui ? Je peux analyser vos finances Odoo, surveiller Stripe ou vérifier vos stocks."
    }
  ]);
  const [input, setInput] = useState("");

  const suggestions = [
    "Quel est le CA de ce mois vs le mois dernier ?",
    "Y a-t-il des factures impayées urgentes ?",
    "Quels sont les produits les plus rentables ?"
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Ajouter le message utilisateur
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simuler la réponse de l'IA (À remplacer par l'appel API vers n8n/Supabase)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Je suis en train d'analyser vos données. L'intégration réelle sera configurée dans la Phase 5 via n8n."
        }
      ]);
    }, 1000);
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-950/50">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
              msg.role === 'user' ? 'bg-zinc-800 text-zinc-300' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
            }`}>
              {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
              msg.role === 'user' 
                ? 'bg-zinc-900 text-white' 
                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="mb-4 flex flex-wrap gap-2">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestion(suggestion)}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <Sparkles className="h-3 w-3 text-emerald-500" />
              {suggestion}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question à l'IA..."
            className="w-full bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 rounded-xl px-5 py-4 pr-14 text-sm outline-none transition-all placeholder:text-zinc-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 text-white disabled:text-zinc-400 dark:disabled:text-zinc-600 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="text-center text-[10px] text-zinc-500 mt-3">
          L'IA IA peut faire des erreurs. Veuillez vérifier les informations importantes générées par n8n dans les sources d'origine.
        </p>
      </div>
    </div>
  );
}
