import { NextResponse } from 'next/server';
import { getSupabaseCookiesUtilClient } from '@/supabase-utils/cookiesUtilClient';

export async function GET(request) {
    const supabase = await getSupabaseCookiesUtilClient();
    await supabase.auth.signOut();

    return NextResponse.redirect(new URL('/', request.url));
}
