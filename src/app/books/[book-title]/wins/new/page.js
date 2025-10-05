'use client'

import { useRef } from 'react';

export default function CreateWin() {
    const winTitleRef = useRef(null);
    const winDescriptionRef = useRef(null);

    return (
        <article>
            <h3>Add win</h3>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    alert('TODO: Add a win');
                }}
            >
                <input ref={winTitleRef} placeholder='Add a title' />
                <textarea ref={winDescriptionRef} placeholder='Add details' />
                <button type='submit'>Add win</button>
            </form>
        </article>
    );
}