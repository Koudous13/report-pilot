import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

/**
 * Cet endpoint permet à n8n d'envoyer des notifications ou des logs système
 * directement à ReportPilot après un traitement (ex: analyse de facture, message WhatsApp reçu).
 */
export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    // Note: Dans une version sécurisée, on vérifierait un API_KEY secret ici
    const data = await request.json();

    const { user_id, action_type, description, severity } = data;

    if (!user_id || !action_type || !description) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    const { error } = await supabase.from('system_logs').insert({
      user_id,
      action_type,
      description,
      severity: severity || 'info'
    });

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Log enregistré' });

  } catch (error: any) {
    console.error('Webhook n8n Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
