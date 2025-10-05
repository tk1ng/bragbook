'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { FORM_TYPES } from '../../formTypes';
import { getSupabaseBrowserClient } from '@/supabase-utils/browserClient';

export const Login = ({ formType }) => {
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const router = useRouter();
    const supabase = getSupabaseBrowserClient();

    const isPasswordRecovery = formType === FORM_TYPES.PASSWORD_RECOVERY;
    const isMagicLinkLogin = formType === FORM_TYPES.MAGIC_LINK;
    const isPasswordLogin = formType === FORM_TYPES.PASSWORD_LOGIN;

    const formAction = isPasswordLogin ? '/auth/pw-login' : '/auth/magic-link';

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('event', event);
            if (event === 'SIGNED_IN') {
                router.push('/books');
            }
        });

        return () => subscription.unsubscribe();
    }, [])

    return (
        <form
            action={formAction}
            method='POST'
            onSubmit={(event) => {
                isPasswordLogin && event.preventDefault();

                supabase.auth.signInWithPassword({
                    email: emailInputRef.current.value,
                    password: passwordInputRef.current.value,
                })
                    .then((result) => {
                        !result.data?.user && alert('Could not sign in.');
                    });
            }
            }>
            {isPasswordRecovery && <input type='hidden' name='type' value='recovery' />}

            <article style={{ maxWidth: '420px', margin: '15em auto' }}>
                <header>
                    {isPasswordRecovery ? (
                        <strong>Request new password</strong>
                    ) : (
                        <strong>Login</strong>
                    )}
                </header>
                <fieldset>
                    <label htmlFor='email'>
                        Email
                        <input
                            type='email'
                            name='email'
                            id='email'
                            ref={emailInputRef} required
                        />
                    </label>
                    {isPasswordLogin && (
                        <label htmlFor='password'>
                            Password
                            <input
                                type='password'
                                name='password'
                                id='password'
                                ref={passwordInputRef} required
                            />
                        </label>
                    )}
                </fieldset>
                <button type='submit'>
                    {isPasswordLogin && 'Sign in with Password'}
                    {isPasswordRecovery && 'Request new Password'}
                    {isMagicLinkLogin && 'Sign in with Magic Link'}
                </button>

                <p>
                    {!isPasswordLogin && (
                        <Link
                            role='button'
                            className='contrast'
                            href={{
                                pathname: '/',
                                query: { magicLink: 'no' }
                            }}
                        >
                            Go to Password Login
                        </Link>
                    )}

                    {!isMagicLinkLogin && (
                        <Link
                            role='button'
                            className='contrast'
                            href={{
                                pathname: '/',
                                query: { magicLink: 'yes' }
                            }}
                        >
                            Go to Magic Link Login
                        </Link>
                    )}

                    {!isPasswordRecovery && (
                        <Link
                            // role='button'
                            href={{
                                pathname: '/',
                                query: { passwordRecovery: 'yes' }
                            }}
                            style={{
                                textAlign: 'center',
                                display: 'block',
                            }}
                        >
                            Forgot password?
                        </Link>
                    )}
                </p>
            </article>
        </form>
    );
}