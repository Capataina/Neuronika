import { Note } from '../store/NoteStore';

interface SizeConstraints {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
}

const DEFAULT_CONSTRAINTS: SizeConstraints = {
  minWidth: 1,
  maxWidth: 3,
  minHeight: 1,
  maxHeight: 3,
};

export function calculateRelativeSizes(notes: Note[], constraints: SizeConstraints = DEFAULT_CONSTRAINTS) {
  if (notes.length === 0) return [];

  // Find min and max content sizes
  const sizes = notes.map(note => note.contentSize);
  const minSize = Math.min(...sizes);
  const maxSize = Math.max(...sizes);

  // If all notes are the same size, return default minimum dimensions
  if (minSize === maxSize) {
    return notes.map(() => ({
      width: constraints.minWidth,
      height: constraints.minHeight,
    }));
  }

  // Calculate relative sizes
  return notes.map(note => {
    // Normalize the size to a value between 0 and 1
    const normalizedSize = (note.contentSize - minSize) / (maxSize - minSize);

    // Map normalized size to specific size combinations
    // This creates a progression of sizes as content grows
    let width, height;
    if (normalizedSize < 0.2) {
      width = 1; height = 1;      // Smallest: 1x1
    } else if (normalizedSize < 0.4) {
      width = 2; height = 1;      // Small-medium: 2x1
    } else if (normalizedSize < 0.6) {
      width = 2; height = 2;      // Medium: 2x2
    } else if (normalizedSize < 0.8) {
      width = 2; height = 3;      // Medium-large: 2x3
    } else {
      width = 3; height = 3;      // Largest: 3x3
    }

    return { width, height };
  });
}
