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

  // Special case: if there's only one note, return maximum dimensions
  if (notes.length === 1) {
    return [{
      width: constraints.maxWidth,
      height: constraints.maxHeight,
    }];
  }

  // Find min and max content sizes
  const sizes = notes.map(note => note.contentSize);
  const minSize = Math.min(...sizes);
  const maxSize = Math.max(...sizes);

  // If all notes are the same size, make them all 3x3 (middle size)
  if (minSize === maxSize) {
    return notes.map(() => ({
      width: 3,
      height: 3,
    }));
  }

  // Calculate relative sizes
  return notes.map(note => {
    // Normalize the size to a value between 0 and 1
    const normalizedSize = (note.contentSize - minSize) / (maxSize - minSize);

    // Define size thresholds based on percentiles:
    // 0-10%: 2x2
    // 10-35%: 2x3 or 3x2
    // 35-65%: 3x3
    // 65-90%: 3x4 or 4x3
    // 90-100%: 4x4
    let width: number;
    let height: number;

    if (normalizedSize <= 0.10) {
      // Bottom 10% - smallest notes
      width = 2;
      height = 2;
    } else if (normalizedSize <= 0.35) {
      // Next 25% - small-medium notes
      [width, height] = Math.random() < 0.5 ? [2, 3] : [3, 2];
    } else if (normalizedSize <= 0.65) {
      // Middle 30% - medium notes
      width = 3;
      height = 3;
    } else if (normalizedSize <= 0.90) {
      // Next 25% - medium-large notes
      [width, height] = Math.random() < 0.5 ? [3, 4] : [4, 3];
    } else {
      // Top 10% - largest notes
      width = 4;
      height = 4;
    }

    return { width, height };
  });
}
