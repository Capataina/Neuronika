import { Responsive, WidthProvider } from 'react-grid-layout';
import { useNoteStore } from '../../store/NoteStore';
import NoteCard from './NoteCard';
import { calculateRelativeSizes } from '../../MathUtils/autoResizing';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { rearrangeLayout } from '../../MathUtils/rearrange';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function MasonryBoard() {
  const notes = useNoteStore((state) => state.notes);

  // Calculate relative sizes based on content length
  const relativeSizes = calculateRelativeSizes(notes);

  const layouts = {
    lg: rearrangeLayout(notes, relativeSizes),
    md: rearrangeLayout(notes, relativeSizes),
    sm: rearrangeLayout(notes, relativeSizes),
    xs: rearrangeLayout(notes, relativeSizes),
    xxs: rearrangeLayout(notes, relativeSizes),
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

