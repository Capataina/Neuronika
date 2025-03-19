import { Note } from '../store/NoteStore';

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW: number;
  maxW: number;
  minH: number;
  maxH: number;
}

interface Position {
  x: number;
  y: number;
  score: number;
}

export function rearrangeLayout(notes: Note[], relativeSizes: { width: number; height: number }[]): LayoutItem[] {
  // Create a randomly shuffled array of indices
  const shuffledIndices = [...Array(notes.length).keys()];
  for (let i = shuffledIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
  }

  const maxCols = 8;
  const maxRows = 50;
  const grid: boolean[][] = Array(maxRows).fill(null).map(() => Array(maxCols).fill(false));
  const layout: LayoutItem[] = [];

  function canFitCard(row: number, col: number, width: number, height: number): boolean {
    if (col + width > maxCols || row + height > maxRows) return false;

    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        if (grid[row + h][col + w]) return false;
      }
    }
    return true;
  }

  function findBestPosition(width: number, height: number): Position {
    let bestScore = Infinity;
    let bestPositions: Position[] = [];

    for (let row = 0; row < maxRows; row++) {
      for (let col = 0; col <= maxCols - width; col++) {
        if (!canFitCard(row, col, width, height)) continue;

        // Calculate score based on gaps that would be created
        let score = row * 2; // Prefer higher positions

        // Check for gaps above
        let hasCardAbove = false;
        if (row > 0) {
          for (let w = 0; w < width; w++) {
            if (grid[row - 1][col + w]) {
              hasCardAbove = true;
              break;
            }
          }
        }
        if (!hasCardAbove && row > 0) score += 4;

        // Check for cards to the left and right
        let hasAdjacentCard = false;
        // Left
        if (col > 0) {
          for (let h = 0; h < height; h++) {
            if (grid[row + h][col - 1]) {
              hasAdjacentCard = true;
              break;
            }
          }
        }
        // Right
        if (col + width < maxCols) {
          for (let h = 0; h < height; h++) {
            if (grid[row + h][col + width]) {
              hasAdjacentCard = true;
              break;
            }
          }
        }
        if (!hasAdjacentCard) score += 2;

        // If this score is better or equal to our best score, add it to possibilities
        if (score <= bestScore) {
          if (score < bestScore) {
            bestPositions = [];
            bestScore = score;
          }
          bestPositions.push({ x: col, y: row, score });
        }
      }

      // If we found positions and they're at the top, no need to look further
      if (bestPositions.length > 0 && bestScore <= 2) break;
    }

    // Randomly select from the best positions
    return bestPositions[Math.floor(Math.random() * bestPositions.length)];
  }

  // Place each note
  shuffledIndices.forEach((originalIndex) => {
    const note = notes[originalIndex];
    const size = relativeSizes[originalIndex];

    const position = findBestPosition(size.width, size.height);

    if (position) {
      // Mark the grid spaces as occupied
      for (let h = 0; h < size.height; h++) {
        for (let w = 0; w < size.width; w++) {
          grid[position.y + h][position.x + w] = true;
        }
      }

      layout.push({
        i: note.id,
        x: position.x,
        y: position.y,
        w: size.width,
        h: size.height,
        minW: 1,
        maxW: 8,
        minH: 1,
        maxH: 8,
      });
    }
  });

  return layout;
}
