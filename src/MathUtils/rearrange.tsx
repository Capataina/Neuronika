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

export function rearrangeLayout(notes: Note[], relativeSizes: { width: number; height: number }[]): LayoutItem[] {
  // Create a copy of notes and sizes to work with
  const noteItems = notes.map((note, index) => ({
    note,
    width: relativeSizes[index].width,
    height: relativeSizes[index].height,
  }));

  const maxCols = 8;
  const maxRows = 50; // Upper limit to prevent infinite recursion

  // Create grid to track occupied cells
  const grid: boolean[][] = Array(maxRows).fill(0).map(() => Array(maxCols).fill(false));

  // Array to track which notes have been placed
  const usedNotes = new Array(noteItems.length).fill(false);

  // Final layout result
  const layout: LayoutItem[] = [];

  // Start the recursive placement from top-left
  placeNotesWithBacktracking(grid, 0, 0, noteItems, usedNotes, layout, maxCols, maxRows);

  // Sort by position for cleaner display
  layout.sort((a, b) => a.y - b.y || a.x - b.x);

  return layout;
}

function placeNotesWithBacktracking(
  grid: boolean[][],
  startRow: number,
  startCol: number,
  noteItems: Array<{ note: Note; width: number; height: number }>,
  usedNotes: boolean[],
  layout: LayoutItem[],
  maxCols: number,
  maxRows: number
): boolean {
  // Base case: if we've used all notes or reached the end of the grid
  if (usedNotes.every(used => used) || startRow >= maxRows) {
    return true;
  }

  // If we've reached the end of a row, move to the next row
  if (startCol >= maxCols) {
    return placeNotesWithBacktracking(
      grid, startRow + 1, 0, noteItems, usedNotes, layout, maxCols, maxRows
    );
  }

  // If this cell is already occupied, move to the next cell
  if (grid[startRow][startCol]) {
    return placeNotesWithBacktracking(
      grid, startRow, startCol + 1, noteItems, usedNotes, layout, maxCols, maxRows
    );
  }

  // Get available notes (not used yet)
  const availableIndices = usedNotes
    .map((used, index) => used ? -1 : index)
    .filter(index => index !== -1);

  // If no notes available, we're done with this branch
  if (availableIndices.length === 0) {
    return true;
  }

  // Randomize the order of available notes
  shuffleArray(availableIndices);

  // Try each available note
  for (const index of availableIndices) {
    const item = noteItems[index];

    // Check if this note can fit at the current position
    if (canPlaceNote(grid, startRow, startCol, item.width, item.height, maxCols, maxRows)) {
      // Mark this note as used
      usedNotes[index] = true;

      // Place this note on the grid
      markGridOccupied(grid, startRow, startCol, item.width, item.height, true);

      // Add to layout
      layout.push({
        i: item.note.id,
        x: startCol,
        y: startRow,
        w: item.width,
        h: item.height,
        minW: 2,
        maxW: 8,
        minH: Math.max(2, Math.floor(item.height / 2)),
        maxH: Math.min(8, Math.ceil(item.height * 1.5))
      });

      // Calculate the next position to try
      // Strategy: move to the right of the current note, or to the next row if at edge
      const nextCol = (startCol + item.width >= maxCols) ? 0 : startCol + item.width;
      const nextRow = (nextCol === 0) ? findNextEmptyRow(grid, startRow, maxCols) : startRow;

      // Recursively try to place more notes
      if (placeNotesWithBacktracking(
        grid, nextRow, nextCol, noteItems, usedNotes, layout, maxCols, maxRows
      )) {
        return true; // Successfully placed all notes
      }

      // If we get here, backtracking is needed
      // Remove this note from layout
      layout.pop();

      // Mark grid as unoccupied
      markGridOccupied(grid, startRow, startCol, item.width, item.height, false);

      // Mark note as unused
      usedNotes[index] = false;
    }
  }

  // If we get here, no placement worked from this position
  // Try the next position
  return placeNotesWithBacktracking(
    grid, startRow, startCol + 1, noteItems, usedNotes, layout, maxCols, maxRows
  );
}

// Check if a note can be placed at the specified position
function canPlaceNote(
  grid: boolean[][],
  startRow: number,
  startCol: number,
  width: number,
  height: number,
  maxCols: number,
  maxRows: number
): boolean {
  // Check if the note would go out of bounds
  if (startCol + width > maxCols || startRow + height > maxRows) {
    return false;
  }

  // Check if all cells needed are empty
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (grid[startRow + r][startCol + c]) {
        return false; // Cell is already occupied
      }
    }
  }

  return true;
}

// Mark cells as occupied or unoccupied
function markGridOccupied(
  grid: boolean[][],
  startRow: number,
  startCol: number,
  width: number,
  height: number,
  isOccupied: boolean
): void {
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      grid[startRow + r][startCol + c] = isOccupied;
    }
  }
}

// Find the next row with any empty cell
function findNextEmptyRow(
  grid: boolean[][],
  currentRow: number,
  maxCols: number
): number {
  let row = currentRow;

  while (row < grid.length) {
    for (let col = 0; col < maxCols; col++) {
      if (!grid[row][col]) {
        return row; // Found a row with an empty cell
      }
    }
    row++;
  }

  return row; // No empty cells found, return next row
}

// Shuffle array in-place (Fisher-Yates algorithm)
function shuffleArray(array: number[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}