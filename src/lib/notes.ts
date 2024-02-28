import { persisted } from 'svelte-persisted-store';
import type { NoteType } from '$lib'

export const notes = persisted<NoteType>('notes', []);
export const hasVisited = persisted<boolean>('hasVisited', false);