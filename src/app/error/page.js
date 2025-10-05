import Link from 'next/link';

export default async function ErrorPage({ searchParams }) {
    const { type } = await searchParams;
    const knownErrors = ['login-failed', 'magic-link', 'invalid-magic-link'];

    return (
        <div style={{ textAlign: 'center ' }}>
            <h1>Oooops!!!</h1>
            {type === 'login-failed' && (
                <strong>Login was not successful.</strong>
            )}

            {type === 'magic-link' && (
                <strong>Could not send magic link.</strong>
            )}

            {type === 'invalid-magic-link' && (
                <strong>The magic link was expired or invalid. Please request a new one.</strong>
            )}

            {!knownErrors.includes(type) && (
                <strong>Something went wrong. Please try again or contact support.</strong>
            )}

            <br />
            <Link href='/'>Go back</Link>
        </div>
    )
}