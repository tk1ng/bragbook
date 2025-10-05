import Nav from './Nav'

export default function BooksListLayout(pageProps) {
    return (
        <>
            <section style={{ borderBottom: '1px solid violet' }}>
                <Nav />
            </section>
            <section>{pageProps.children}</section>
        </>
    );
};