import { create } from 'zustand';
import { debugNotes } from './debubNotes';

export interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteStore {
  notes: Note[];
  addNote: (note: Omit<Note, 'id'>) => void;
  removeNote: (id: string) => void;
  updateNote: (id: string, updates: Partial<Omit<Note, 'id'>>) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],

  addNote: (note) => set((state) => ({
    notes: [...state.notes, { ...note, id: crypto.randomUUID() }]
  })),

  removeNote: (id) => set((state) => ({
    notes: state.notes.filter((note) => note.id !== id)
  })),

  updateNote: (id, updates) => set((state) => ({
    notes: state.notes.map((note) =>
      note.id === id ? { ...note, ...updates } : note
    )
  }))
}));

// Add debug notes - easy to comment out when needed
debugNotes.forEach(note => {
  useNoteStore.getState().addNote(note);
});
