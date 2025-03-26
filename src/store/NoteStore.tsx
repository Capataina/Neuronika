import { create } from 'zustand';
import { debugNotes } from './debubNotes';

export interface Note {
  id: string;
  title: string;
  content: string;
  contentSize: number;
  tags: string[];
}

interface NoteStore {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'contentSize'>) => void;
  removeNote: (id: string) => void;
  updateNote: (id: string, updates: Partial<Omit<Note, 'id' | 'contentSize'>>) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],

  addNote: (note) => set((state) => ({
    notes: [...state.notes, {
      ...note,
      id: crypto.randomUUID(),
      contentSize: note.content.length,
      tags: note.tags || []
    }]
  })),

  removeNote: (id) => set((state) => ({
    notes: state.notes.filter((note) => note.id !== id)
  })),

  updateNote: (id, updates) => set((state) => ({
    notes: state.notes.map((note) =>
      note.id === id
        ? {
          ...note,
          ...updates,
          contentSize: updates.content ? updates.content.length : note.contentSize,
          tags: updates.tags !== undefined ? updates.tags : note.tags
        }
        : note
    )
  }))
}));

// Add debug notes - easy to comment out when needed
debugNotes.forEach(note => {
  useNoteStore.getState().addNote(note);
});
