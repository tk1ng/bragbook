'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/supabase-utils/browserClient'

export default function ChangePasswordPage() {
    const passwordInputRef = useRef(null);
    const verifyPasswordInputRef = useRef(null);

    const supabase = getSupabaseBrowserClient();
    const router = useRouter();

    const handlePasswordUpdate = (event) => {
        event.preventDefault();

        supabase.auth.updateUser({
            password: passwordInputRef.current.value
        }).then((result) => {
            if (result.error) {
                alert(result.error.message);
            } else {
                alert('Password updated!');
            }
        });
    }

    return (
        <form onSubmit={handlePasswordUpdate}>
            <article style={{ maxWidth: '420px', margin: 'auto' }}>
                <header>
                    Enter new password
                </header>
                <fieldset>
                    <label htmlFor='password'>
                        new password
                        <input
                            type='password'
                            id='password'
                            name='password'
                            ref={passwordInputRef}
                            required
                        />
                    </label>
                    <label htmlFor='password'>
                        verify password
                        <input
                            type='verifyPassword'
                            id='verifyPassword'
                            name='verifyPassword'
                            ref={verifyPasswordInputRef}
                            required
                        />
                    </label>
                </fieldset>

                <button type='submit'>
                    Change Password
                </button>
            </article>
        </form>
    )
}