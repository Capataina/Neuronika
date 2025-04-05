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
  // Calculate a more nuanced content size based on multiple factors
  let size = 0;

  // Factor 1: Raw content length (characters)
  size += content.length * 0.01;

  // Factor 2: Number of paragraphs (more paragraphs = more complex content)
  const paragraphs = content.split('\n\n').length;
  size += paragraphs * 0.5;

  // Factor 3: Number of markdown elements (headers, lists, code blocks, etc.)
  const markdownElements = (content.match(/#{1,6}\s|`{1,3}|\*\s|-\s|\d\.\s|\*\*|__/g) || []).length;
  size += markdownElements * 0.3;

  // Factor 4: Word count (better measure than pure character count)
  const words = content.split(/\s+/).length;
  size += words * 0.05;

  // Normalize to a value between 2 and 8
  // This gives us more granular values for the relative sizing to work with
  const normalized = 2 + (6 * (Math.min(size, 100) / 100));

  return normalized;
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
