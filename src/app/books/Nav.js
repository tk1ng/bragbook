'use client'

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { getSupabaseBrowserClient } from '@/supabase-utils/browserClient';

export default function Nav() {
    const supabase = getSupabaseBrowserClient();
    const router = useRouter();

    const pathname = usePathname();
    const activeProps = { className: 'contrast' };
    const inactiveProps = { className: 'secondary outline' };

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                router.push('/');
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <nav>
            <ul>
                <li>
                    <Link role='button' href='/books' {...(pathname === '/books' ? activeProps : inactiveProps)} >Books</Link>
                </li>
                {/* Make this link dynamic so it shows create new win maybe based on route or add option for adding to WinsList component */}
                <li>
                    <Link role='button' href='/books/new' {...(pathname === '/books/new' ? activeProps : inactiveProps)}>Create new book</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link
                        role='button'
                        href='/logout'
                        prefetch={false}
                        className='secondary'
                        onClick={(event) => {
                            event.preventDefault();
                            supabase.auth.signOut();
                        }}
                    >
                        Log out
                    </Link>
                </li>
            </ul>
        </nav>
    )
}