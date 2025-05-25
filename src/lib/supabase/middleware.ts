import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabaseClient = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                }
            }
        }
    );

    // Do not run code between createServeerClient and supabase.auth.getUser(). This can cause issues

    const { data: { user } } = await supabaseClient.auth.getUser();

    if (
        !user &&
        !request.nextUrl.pathname.startsWith('/auth/login') &&
        !request.nextUrl.pathname.startsWith('/auth')
    ) {
        const url = request.nextUrl.clone();
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
    }


    if (
        user && request.nextUrl.pathname.startsWith('/auth/login') ||
        user && request.nextUrl.pathname.startsWith('/auth/sign-up')) {
        const url = request.nextUrl.clone();
        url.pathname = '/protected';
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
};