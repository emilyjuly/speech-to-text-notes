import {defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
    state: () => ({ notes: [] as string[] }),
    actions: {
        createNote(text): void {
            this.notes.push(text)
        }
    },
})