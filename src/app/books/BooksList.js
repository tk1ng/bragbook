import Link from 'next/link';

export function BooksList({ books }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th></th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td><Link href={`books/${book.slug}/wins`}>{book.title}</Link></td>
                        <td>{book.desc}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}