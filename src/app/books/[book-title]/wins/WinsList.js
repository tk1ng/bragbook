import Link from 'next/link';
import classes from './wins.module.css';

export function WinsList({ wins }) {
    return (
        <section>
            <Link href={'wins/new'}>+ Add win</Link>
            {wins.map((win) => (
                <article key={win.id} className={classes.win}>
                    <Link href={`wins/details/${win.id}`}><strong>{win.title}</strong></Link>
                    <time> {win.date}</time>
                    <p>{win.description}</p>
                    <p>type: {win.type}</p>
                    <p>tag: {win.tags}</p>
                </article>
            ))}
        </section>
    );
}