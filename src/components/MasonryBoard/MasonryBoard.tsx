import { Responsive, WidthProvider } from 'react-grid-layout';
import { useNoteStore } from '../../store/NoteStore';
import NoteCard from './NoteCard';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function MasonryBoard() {
  const notes = useNoteStore((state) => state.notes);

  const layouts = {
    lg: notes.map((note, i) => ({
      i: note.id,
      x: (i % 8) * 1, // Ensure proper spacing
      y: Math.floor(i / 8),
      w: 1, // Make each note take up 1/8 of the width
      h: 2,
      minW: 1,
      maxW: 2,
      minH: 1,
      maxH: 4,
    })),
  };

  return (
    <div className="h-full w-full overflow-auto">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 8, md: 6, sm: 4, xs: 2, xxs: 1 }}
        rowHeight={100}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        isDraggable={true}
        isResizable={true}
        useCSSTransforms={true}
      >
        {notes.map((note) => (
          <div key={note.id}>
            <NoteCard title={note.title} content={note.content} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}

