import { BooksList } from './BooksList';

const dummyBragBooks = [
    {
        id: 1,
        title: 'Support Eng',
        desc: 'Growth as support eng',
        slug: 'support-eng',
    },
    {
        id: 2,
        title: 'Frontend Dev',
        desc: 'Growth as Frontend Dev',
        slug: 'frontend-dev',
    },
    {
        id: 3,
        title: 'Database Admin',
        desc: 'Growth as Database admin',
        slug: 'database-admin'
    },
];


export default function BooksListPage() {
    return (
        <>
            <h2>Books List</h2>
            <BooksList books={dummyBragBooks} />
        </>
    )
}