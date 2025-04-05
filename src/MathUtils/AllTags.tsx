import { Note } from '../store/NoteStore';
import { useEffect } from 'react';
import { useNoteStore } from '../store/NoteStore';

interface TagCount {
  tag: string;
  count: number;
}

export function getAllTags(notes: Note[]): TagCount[] {
  // Create a map to count tag occurrences
  const tagCounts = new Map<string, number>();

  // Count occurrences of each tag
  notes.forEach(note => {
    note.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  // Convert to array and sort by count (descending)
  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

// Debug hook to log tag counts
export function useDebugTagCounts() {
  const notes = useNoteStore(state => state.notes);

  useEffect(() => {
    const tagCounts = getAllTags(notes);
    console.log('Tag Counts:', tagCounts);
  }, [notes]);
}
