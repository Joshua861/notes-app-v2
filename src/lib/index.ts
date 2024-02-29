import { notes } from '$lib/notes.ts'
import save from 'save-file';
import { goto } from '$app/navigation';
import { v4 as uuidv4 } from 'uuid';
import { get } from 'svelte/store';

export type NoteType = { title: string; content: string; id: string; date: number; pinned: boolean }

export function removeEmptyNotes() {
    notes.update((notes) => 
        notes.filter((note: NoteType) => {
            return (note.title !== 'No title' && note.title !== undefined && note.title !== '') || (note.content !== '' && note.content !== undefined && note.content !== '');
        })
    )
}

export function onLoad() {
    removeEmptyNotes();
    spawnHelp();
    console.log(get(notes));
}

export function findNote(id) {
    const notesValue = get(notes)
    return notesValue.find((note) => note.id === id);
}

export async function downloadNote(id) {
    const note = findNote(id)
    await save(`
# ${note.title}
    
${note.content}
    `, `${note.title.replaceAll(' ', '-').toLowerCase()}.md`)
}

export function editNote(id) {
    goto(`/edit?id=${id}`)
}

export function deleteNote(id) {
    notes.update((n) => n.filter((note) => note.id !== id))
}

export function createNote(title: string, content: string, id = uuidv4(), pinned: boolean = false, date = Date.now()) {
    const note: NoteType = {
        title: title === '' || undefined ? 'No title' : title,
        id: id,
        date: date,
        content: content,
        pinned: pinned,
    }

    notes.update((n: NoteType) => {
        return [note, ...n];
    });
}

export function updateNote(id: string, title: string, content: string, pinned: boolean, date = Date.now()) {
    deleteNote(id)
    createNote(title, content, id, pinned)
}

export function viewNote(id: string) {
    goto(`/note?id=${id}`)
}

export function pinNote(id: string) {
    const note = findNote(id)

    if (!note) {
        console.error(`Note with id ${id} not found.`)
        return
    }

    deleteNote(id)
    createNote(note.title, note.content, note.id, true)
}

export function unpinNote(id: string) {
    const note = findNote(id)

    if (!note) {
        console.error(`Note with id ${id} not found.`)
        return
    }

    deleteNote(id)
    createNote(note.title, note.content, note.id, false)
}

export function spawnHelp() {
    if (get(notes).length <= 0) {
        createNote("How to use", `This notes app uses *Markdown* for text formatting, meaning you can add *italic*, **bold**, \`monospaced\`, and [hyperlinked](https://example.com) text.                

        You can also add:
                        
        > Blockquotes!
                        
        - Unordered
        - lists,
                        
        1. Ordered
        2. lists,
                        
        ## Subheadings,
                        
        and more.
                        
        If you don't know Markdown, and want to learn, you can learn [here](https://commonmark.org/help/), or try editing this page to see how it was written.
                        
        ___
                        
        ## Storage
                        
        All the notes inputted here are stored on-device, they are not uploaded anywhere and aren't accessable by anyone but you; this also means that they aren't synced between devices. They *are* autosaved; if you close the tab mid-note, that note will still be there when you come back.`.replace(/^\s+/gm, ''), 'how-to-use', true)
    }
}

export function getNotesData() {
    const notesValue = get(notes)
    const json = JSON.stringify(notesValue)
    const b64 = btoa(json)

    return b64
}

export function loadNoteData(data: string) {
    const json = atob(data)
    notes.set(JSON.parse(json))
}

export function replaceNote(id: string, note: NoteType) {
    deleteNote(id);
    createNote(note.title, note.content, note.id, note.pinned, note.date)
}