import { NextResponse } from 'next/server';
import { getSupabaseReqResClient } from './supabase-utils/reqResClient';

export const config = {
    matcher: [
        "/((?!.*\\.).*)"
    ]
};

export async function middleware(request) {
    const { supabase, response } = getSupabaseReqResClient({ request });
    const userData = await supabase.auth.getUser();
    const sessionUser = userData.data?.user;
    const requestedPath = request.nextUrl.pathname;

    if (requestedPath.startsWith('/books')) {
        if (!sessionUser) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    } else if (requestedPath === '/') {
        if (sessionUser) {
            return NextResponse.redirect(new URL('/books', request.url))
        }
    }

    return response.value;
}