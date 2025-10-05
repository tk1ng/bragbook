import { WinsList } from './WinsList';

const winsDummyList = [
    {
        id: 3,
        title: 'Build out Admin Studio documentation (WIP)',
        date: '2025-09-16',
        description: 'Started initial draft for overview of Admin Studio as part of technical enablement collaboration project',
        type: 'work',
        tags: ['collaboration'],
        imgUrl: '',
    },
    {
        id: 4,
        title: 'Shout out for updating migration doc on public site',
        date: '2025-09-16',
        description: 'Received a shout out from colleague for catching a needed update and merging PR',
        type: 'kudos',
        tags: ['improvement', 'collaboration'],
        imgUrl: '',
    },
    {
        id: 5,
        title: 'Completed advanced Postgres course',
        date: '2025-09-15',
        description: 'Mastering Postgres course coverin gadvanced performance topics: indexing, schema design',
        type: 'growth & development',
        tags: ['knowledge', 'improvement'],
        imgUrl: '',
    },
];


export default function WinsListPage({ params }) {
    // find option for adjusting book title to show without hyphens or URL encoding
    const bookname = params['book-title'];

    return (
        <>
            <h2>Wins for {bookname}</h2>
            <WinsList wins={winsDummyList} />
        </>
    );
}