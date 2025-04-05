import { Responsive, WidthProvider } from 'react-grid-layout';
import { useNoteStore } from '../../store/NoteStore';
import NoteCard from './NoteCard';
import { calculateRelativeSizes } from '../../MathUtils/autoResizing';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { rearrangeLayout } from '../../MathUtils/rearrange';
import { useState, useMemo } from 'react';
import { useDebugTagCounts } from '../../MathUtils/AllTags';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function MasonryBoard() {
  const notes = useNoteStore((state) => state.notes);
  const searchResults = useNoteStore((state) => state.searchResults);
  const [isAnyCardEditing, setIsAnyCardEditing] = useState(false);

  // Add debug hook
  useDebugTagCounts();

  const displayedNotes = searchResults ?? notes;

  // Calculate layouts based on content size
  const layouts = useMemo(() => {
    // Calculate relative sizes for each note
    const relativeSizes = calculateRelativeSizes(displayedNotes);

    // Use rearrangeLayout to optimize the positioning
    const optimizedLayout = rearrangeLayout(displayedNotes, relativeSizes);

    // Create layouts for different breakpoints with simplified constraints
    return {
      lg: optimizedLayout.map(item => ({
        ...item,
        minW: 2,
        maxW: 8,
        minH: 2,
        maxH: 8
      })),
      md: optimizedLayout.map(item => ({
        ...item,
        minW: 2,
        maxW: 8,
        minH: 2,
        maxH: 8,
      })),
      sm: optimizedLayout.map(item => ({
        ...item,
        minW: 2,
        maxW: 8,
        minH: 2,
        maxH: 8,
        w: Math.min(item.w, 4),
        x: Math.min(item.x, 3)
      })),
      xs: optimizedLayout.map(item => ({
        ...item,
        minW: 2,
        maxW: 8,
        minH: 2,
        maxH: 8,
        w: Math.min(item.w, 2),
        x: Math.min(item.x, 1)
      }))
    };
  }, [displayedNotes]);

  const handleEditStateChange = (isEditing: boolean) => {
    setIsAnyCardEditing(isEditing);
  };

  return (
    <div className="masonry-container">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 8, md: 8, sm: 4, xs: 2, xxs: 1 }}
        rowHeight={100}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        isDraggable={!isAnyCardEditing}
        isResizable={!isAnyCardEditing}
        resizeHandles={['se', 'sw', 'ne', 'nw', 'n', 's', 'e', 'w']}
        useCSSTransforms={true}
      >
        {displayedNotes.map((note) => (
          <div key={note.id}>
            <NoteCard
              id={note.id}
              title={note.title}
              content={note.content}
              tags={note.tags}
              onEditStateChange={handleEditStateChange}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}

