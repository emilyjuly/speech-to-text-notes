import {defineStore } from 'pinia';

export interface Notes {
    notes: [
        {
            id: number,
            text: string,
            date: string,
        }
    ]
}

export const useNotesStore = defineStore('notes', {
    state: () => ({ notes: [] as Notes[] }),
    actions: {
        createNote(note): void {
            this.notes.push(note)
        },

        deleteNote(index): void {
            this.notes.splice(index, 1)
        }
    },
})