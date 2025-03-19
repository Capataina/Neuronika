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
  const [editTitle, setEditTitle] = useState(title);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const updateNote = useNoteStore(state => state.updateNote);

  // Add double click handler for editing
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    onEditStateChange?.(true);  // Notify parent when editing starts
  };

  const handleTitleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTitleEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onEditStateChange?.(false);  // Notify parent when editing ends
    if (editContent !== content) {
      updateNote(id, { content: editContent });
    }
  };

  const handleTitleBlur = () => {
    setIsTitleEditing(false);
    if (editTitle !== title) {
      updateNote(id, { title: editTitle });
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

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsTitleEditing(false);
      setEditTitle(title); // Reset title
    } else if (e.key === 'Enter') {
      e.preventDefault();
      (e.currentTarget as HTMLInputElement).blur();
    }
  };

  return (
    <Card className="w-full h-full note-card rounded-lg">
      <CardHeader className="note-card-header flex items-center justify-center">
        {isTitleEditing ? (
          <input
            type="text"
            className="text-base font-semibold text-center w-full bg-transparent border-none focus:outline-none"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={(e) => {
              e.stopPropagation();  // Add this to prevent spacebar from triggering reorganize
              handleTitleKeyDown(e);
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            autoFocus
          />
        ) : (
          <CardTitle
            className="truncate text-base cursor-text"
            onDoubleClick={handleTitleDoubleClick}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {title}
          </CardTitle>
        )}
      </CardHeader>
      <CardContent className="note-card-content">
        {isEditing ? (
          <textarea
            className="w-full h-full p-0 bg-transparent border-none resize-none focus:outline-none note-content"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()} // Add this to prevent drag start
            autoFocus
          />
        ) : (
          <div
            onDoubleClick={handleDoubleClick}
            onMouseDown={(e) => e.stopPropagation()} // Add this to prevent immediate drag
            className="cursor-text h-full"
          >
            <div className="note-content">
              <ReactMarkdown>
                {content}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
