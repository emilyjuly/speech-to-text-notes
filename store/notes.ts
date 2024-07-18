import { defineStore } from 'pinia';

export interface Note {
  id: number;
  text: string;
  date: string;
  tag: Record<string, any>;
}

export const useNotesStore = defineStore('notes', {
  state: () => ({ notes: [] as Note[] }),
  actions: {
    createNote(note: Note): void {
      this.notes.push(note);
      this.saveNotes();
    },

    deleteNote(index: number): void {
      this.notes.splice(index, 1);
      this.saveNotes();
    },

    saveNotes(): void {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('notes', JSON.stringify(this.notes));
      }
    },

    loadNotes(): void {
      if (typeof localStorage !== 'undefined') {
        const notes = localStorage.getItem('notes');
        if (notes) {
          this.notes = JSON.parse(notes);
        }
      }
    },

    saveToLocalStorage(key: string, value: string): void {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
      }
    },

    loadFromLocalStorage(
      key: string,
      defaultValue: string,
    ): string | undefined {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key) || defaultValue;
      }
    },
  },
});
