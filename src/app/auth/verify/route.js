import { NextResponse } from 'next/server';
import { getSupabaseCookiesUtilClient } from '@/supabase-utils/cookiesUtilClient';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const hashedToken = searchParams.get('hashed_token');
    const isRecovery = searchParams.get('type') === 'recovery';

    const supabase = await getSupabaseCookiesUtilClient();

    let type = 'magiclink';
    if (isRecovery) type = 'recovery';

    const { error } = await supabase.auth.verifyOtp({
        token_hash: hashedToken,
        type
    });

    if (error) {
        return NextResponse.redirect(new URL('/error?type=invalid-magic-link', request.url), { status: 302 });
    } else {
        if (isRecovery) {
            return NextResponse.redirect(new URL('/books/change-password', request.url), { status: 302 })
        }
        return NextResponse.redirect(new URL('/books', request.url), { status: 302 })
    }
}