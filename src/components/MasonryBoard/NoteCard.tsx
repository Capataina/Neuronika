import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { useNoteStore } from "../../store/NoteStore";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  onEditStateChange?: (editing: boolean) => void;
}

export default function NoteCard({ id, title, content, onEditStateChange }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const updateNote = useNoteStore(state => state.updateNote);

  // Add double click handler for editing
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    onEditStateChange?.(true);  // Notify parent when editing starts
  };

  const handleBlur = () => {
    setIsEditing(false);
    onEditStateChange?.(false);  // Notify parent when editing ends
    if (editContent !== content) {
      updateNote(id, { content: editContent });
    }
  };

  // Handle escape key to cancel editing
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      onEditStateChange?.(false);
      setEditContent(content); // Reset content
    }
  };

  return (
    <Card className="w-full h-full note-card rounded-lg">
      <CardHeader className="note-card-header flex items-center justify-center">
        <CardTitle className="truncate text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="note-card-content">
        {isEditing ? (
          <textarea
            className="w-full h-full p-0 bg-transparent border-none resize-none focus:outline-none"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            autoFocus
          />
        ) : (
          <div
            onDoubleClick={handleDoubleClick}
            onMouseDown={(e) => e.stopPropagation()}
            className="note-content cursor-text"
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
