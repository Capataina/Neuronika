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
  searchResults: Note[] | null; // null means show all notes
  setSearchResults: (results: Note[] | null) => void;
  addNote: (note: Omit<Note, 'id' | 'contentSize'>) => void;
  removeNote: (id: string) => void;
  updateNote: (id: string, updates: Partial<Omit<Note, 'id' | 'contentSize'>>) => void;
}

const calculateContentSize = (content: string): number => {
  // Basic calculation based on content length
  const baseSize = Math.ceil(content.length / 100); // One size unit per 100 characters
  return Math.max(2, Math.min(4, baseSize)); // Keep between 2 and 4
};

export const useNoteStore = create<NoteStore>((set) => ({
  notes: debugNotes.map(note => ({
    ...note,
    id: Math.random().toString(36).substr(2, 9),
    contentSize: calculateContentSize(note.content)
  })),
  searchResults: null,
  setSearchResults: (results) => set({ searchResults: results }),

  addNote: (note) => set((state) => {
    const newNote = {
      ...note,
      id: crypto.randomUUID(),
      contentSize: calculateContentSize(note.content),
      tags: note.tags || []
    };
    const updatedNotes = [...state.notes, newNote];
    return { notes: updatedNotes };
  }),

  removeNote: (id) => set((state) => ({
    notes: state.notes.filter((note) => note.id !== id)
  })),

  updateNote: (id, updates) => set((state) => {
    const updatedNotes = state.notes.map((note) =>
      note.id === id
        ? {
          ...note,
          ...updates,
          contentSize: updates.content ? calculateContentSize(updates.content) : note.contentSize,
          tags: updates.tags !== undefined ? updates.tags : note.tags
        }
        : note
    );

    // If we have active search results, we need to update them as well
    let updatedSearchResults = state.searchResults;
    if (state.searchResults) {
      updatedSearchResults = state.searchResults.map((note) =>
        note.id === id
          ? {
            ...note,
            ...updates,
            contentSize: updates.content ? calculateContentSize(updates.content) : note.contentSize,
            tags: updates.tags !== undefined ? updates.tags : note.tags
          }
          : note
      );
    }

    return {
      notes: updatedNotes,
      searchResults: updatedSearchResults
    };
  })
}));
