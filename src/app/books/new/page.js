'use client'

import { useRef } from 'react';

export default function CreateBook() {
    const bookTitleRef = useRef(null);
    const bookDescriptionRef = useRef(null);

    return (
        <article>
            <h3>Create a new book</h3>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    alert('TODO: Add a book ticket');
                }}
            >
                <input ref={bookTitleRef} placeholder='Add a title' />
                <textarea ref={bookDescriptionRef} placeholder='Add a comment' />
                <button type='submit'>Create book now</button>
            </form>
        </article>
    );
}