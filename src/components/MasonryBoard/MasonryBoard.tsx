import { Responsive, WidthProvider } from 'react-grid-layout';
import { useNoteStore } from '../../store/NoteStore';
import NoteCard from './NoteCard';
import { calculateRelativeSizes } from '../../MathUtils/autoResizing';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { rearrangeLayout } from '../../MathUtils/rearrange';
import { useState, useMemo, useEffect } from 'react';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function MasonryBoard() {
  const notes = useNoteStore((state) => state.notes);
  const [isAnyCardEditing, setIsAnyCardEditing] = useState(false);
  const [layoutVersion, setLayoutVersion] = useState(0);

  // Calculate layouts only when layoutVersion changes
  const layouts = useMemo(() => {
    const relativeSizes = calculateRelativeSizes(notes);
    return {
      lg: rearrangeLayout(notes, relativeSizes),
      md: rearrangeLayout(notes, relativeSizes),
      sm: rearrangeLayout(notes, relativeSizes),
      xs: rearrangeLayout(notes, relativeSizes),
      xxs: rearrangeLayout(notes, relativeSizes),
    };
  }, [layoutVersion]); // Remove notes dependency, only depend on layoutVersion

  // Add keyboard event handler
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !isAnyCardEditing) {
        event.preventDefault(); // Prevent page scroll
        setLayoutVersion(v => v + 1); // Increment to trigger recalculation
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAnyCardEditing]);

  const handleEditStateChange = (isEditing: boolean) => {
    setIsAnyCardEditing(isEditing);
  };

  return (
    <div className="masonry-container">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 8, md: 6, sm: 4, xs: 2, xxs: 1 }}
        rowHeight={100}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        isDraggable={!isAnyCardEditing}
        isResizable={!isAnyCardEditing}
        resizeHandles={['se', 'sw', 'ne', 'nw', 'n', 's', 'e', 'w']}
        useCSSTransforms={true}
      >
        {notes.map((note) => (
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

