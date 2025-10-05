import Link from 'next/link'

export default function MagicLinkConfirmationPage() {
    return (
        <div style={{ textAlign: 'center ' }}>
            <h1>Magic on its way!</h1>
            Thanks! You should get a link to login in a moment.
            <br /><br />

            <Link role='button' href='/'>Go back</Link>
        </div>
    )
}