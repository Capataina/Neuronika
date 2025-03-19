import { Note } from '../store/NoteStore';

interface SizeConstraints {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
}

const DEFAULT_CONSTRAINTS: SizeConstraints = {
  minWidth: 2,
  maxWidth: 4,
  minHeight: 2,
  maxHeight: 4,
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
      width = 2; height = 2;      // Smallest 20%: 2x2
    } else if (normalizedSize < 0.4) {
      // Next 20%: randomly choose between 2x3 and 3x2
      if (Math.random() < 0.5) {
        width = 2; height = 3;
      } else {
        width = 3; height = 2;
      }
    } else if (normalizedSize < 0.6) {
      width = 3; height = 3;      // Middle 20%: 3x3
    } else if (normalizedSize < 0.8) {
      // Next 20%: randomly choose between 3x4 and 4x3
      if (Math.random() < 0.5) {
        width = 3; height = 4;
      } else {
        width = 4; height = 3;
      }
    } else {
      width = 4; height = 4;      // Largest 20%: 4x4
    }

    return { width, height };
  });
}
