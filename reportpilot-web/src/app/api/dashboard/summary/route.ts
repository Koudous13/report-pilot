import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Récupérer les KPIs (Total Income, Expenses, Inventory)
    // Pour l'instant, on fait des agrégations simples ou on renvoie du mock si vide
    const { data: transactions, error: transError } = await supabase
      .from('unified_transactions')
      .select('*')
      .eq('user_id', user.id);

    if (transError) throw transError;

    // Récupérer les logs récents
    const { data: logs, error: logsError } = await supabase
      .from('system_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (logsError) throw logsError;

    // Calculer les KPIs de base (MVP Logic)
    const income = transactions
      ?.filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0) || 0;
    
    const expenses = transactions
      ?.filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0) || 0;

    return NextResponse.json({
      kpis: {
        income,
        expenses,
        balance: income - expenses,
        transactionsCount: transactions?.length || 0
      },
      recentLogs: logs || []
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
