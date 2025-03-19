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
  const availableNotes = notes.map((note, index) => ({
    note,
    width: relativeSizes[index].width,
    height: relativeSizes[index].height,
    used: false
  }));

  const maxCols = 8;
  const maxRows = 50;
  const layout: LayoutItem[] = [];

  // Track the current row we're filling
  let currentRow = 0;

  // For each row, we'll attempt to fill it completely
  while (availableNotes.some(item => !item.used) && currentRow < maxRows) {
    let currentCol = 0;
    let rowHeight = 0;

    // Keep trying to fill the current row until we can't add more notes
    while (currentCol < maxCols) {
      const remainingWidth = maxCols - currentCol;
      if (remainingWidth <= 0) break;

      // First, try to find notes that exactly fit the remaining space
      const exactFits = availableNotes.filter(item =>
        !item.used && item.width === remainingWidth
      );

      // If we have exact fits, randomly select one
      if (exactFits.length > 0) {
        const randomIndex = Math.floor(Math.random() * exactFits.length);
        const selectedNote = exactFits[randomIndex];

        // Add this note to the layout
        layout.push({
          i: selectedNote.note.id,
          x: currentCol,
          y: currentRow,
          w: selectedNote.width,
          h: selectedNote.height,
          minW: 1,
          maxW: 8,
          minH: 1,
          maxH: 8
        });

        // Update row information
        rowHeight = Math.max(rowHeight, selectedNote.height);
        selectedNote.used = true;
        currentCol += selectedNote.width;
        continue;
      }

      // If no exact fits, find all notes that could fit in the remaining space
      const possibleFits = availableNotes.filter(item =>
        !item.used && item.width <= remainingWidth
      );

      // If we have possible fits, randomly select one
      if (possibleFits.length > 0) {
        const randomIndex = Math.floor(Math.random() * possibleFits.length);
        const selectedNote = possibleFits[randomIndex];

        // Add this note to the layout
        layout.push({
          i: selectedNote.note.id,
          x: currentCol,
          y: currentRow,
          w: selectedNote.width,
          h: selectedNote.height,
          minW: 1,
          maxW: 8,
          minH: 1,
          maxH: 8
        });

        // Update row information
        rowHeight = Math.max(rowHeight, selectedNote.height);
        selectedNote.used = true;
        currentCol += selectedNote.width;
      } else {
        // If no notes fit the remaining space, we need a new strategy
        // Check if we've placed anything in this row
        if (currentCol > 0) {
          // Move to the next row
          break;
        } else {
          // This is an empty row, and no available notes fit within the max width
          // Try picking the smallest available note
          const smallestNote = availableNotes
            .filter(item => !item.used)
            .sort((a, b) => a.width - b.width)[0];

          if (smallestNote) {
            // Add this note to the layout
            layout.push({
              i: smallestNote.note.id,
              x: currentCol,
              y: currentRow,
              w: smallestNote.width,
              h: smallestNote.height,
              minW: 1,
              maxW: 8,
              minH: 1,
              maxH: 8
            });

            // Update row information
            rowHeight = Math.max(rowHeight, smallestNote.height);
            smallestNote.used = true;
            currentCol += smallestNote.width;
          } else {
            // No more notes available
            break;
          }
        }
      }
    }

    // If we placed nothing in this row, we're done
    if (rowHeight === 0) break;

    // Move to the next row
    currentRow += rowHeight;
  }

  // Add any remaining notes that haven't been placed yet
  const unusedNotes = availableNotes.filter(item => !item.used);
  if (unusedNotes.length > 0) {
    // Shuffle the remaining notes for randomness
    for (let i = unusedNotes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [unusedNotes[i], unusedNotes[j]] = [unusedNotes[j], unusedNotes[i]];
    }

    // Place the remaining notes in a new row
    let col = 0;
    for (const item of unusedNotes) {
      if (col + item.width > maxCols) {
        col = 0;
        currentRow += 1;
      }

      layout.push({
        i: item.note.id,
        x: col,
        y: currentRow,
        w: item.width,
        h: item.height,
        minW: 1,
        maxW: 8,
        minH: 1,
        maxH: 8
      });

      col += item.width;
    }
  }

  // Now add the final step: optimize the layout to handle variable heights
  optimizeVariableHeights(layout, maxCols);

  return layout;
}

function optimizeVariableHeights(layout: LayoutItem[], _maxCols: number): void {
  // Sort layout by y position (top to bottom)
  layout.sort((a, b) => a.y - b.y || a.x - b.x);

  // Group items by their starting y-coordinate
  const rowGroups: Record<number, LayoutItem[]> = {};
  layout.forEach(item => {
    if (!rowGroups[item.y]) {
      rowGroups[item.y] = [];
    }
    rowGroups[item.y].push(item);
  });

  // Process each row group and adjust vertical positions
  let currentY = 0;
  const processedRows = Object.keys(rowGroups)
    .map(Number)
    .sort((a, b) => a - b);

  processedRows.forEach(rowY => {
    const rowItems = rowGroups[rowY];
    const maxHeightInRow = Math.max(...rowItems.map(item => item.h));

    // Adjust the y-position of all items in this row
    rowItems.forEach(item => {
      item.y = currentY;
    });

    currentY += maxHeightInRow;
  });
}