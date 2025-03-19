interface NoteCardProps {
  title: string;
  content: string;
}

export default function NoteCard({ title, content }: NoteCardProps) {
  return (
    <div className="h-full p-4 border rounded-lg shadow-sm bg-white overflow-auto">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 whitespace-pre-line">{content}</p>
    </div>
  );
}
