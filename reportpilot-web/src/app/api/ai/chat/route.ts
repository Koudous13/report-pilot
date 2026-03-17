import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message manquant' }, { status: 400 });
    }

    // 1. Loguer l'action utilisateur
    await supabase.from('system_logs').insert({
      user_id: user.id,
      action_type: 'user_message',
      description: `L'utilisateur a demandé : ${message.substring(0, 100)}...`,
      severity: 'info'
    });

    // 2. Simuler un traitement ou appeler un webhook n8n
    // Pour l'instant, on renvoie une réponse statique pour tester l'UI
    // Dans la Phase 5 finale, on fera un fetch() vers l'URL du workflow n8n
    
    // Simuler le délai de réflexion de l'IA
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      reply: "C'est bien noté ! Je traite votre demande. (Note : L'intégration n8n réelle sera configurée une fois les webhooks activés)."
    });

  } catch (error: any) {
    console.error('AI Chat Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
