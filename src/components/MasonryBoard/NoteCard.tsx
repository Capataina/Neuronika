import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import { useState, useRef, useEffect } from 'react';
import { useNoteStore } from "../../store/NoteStore";
import { TagBadge } from "./TagBadge";
import remarkGfm from 'remark-gfm';

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  onEditStateChange: (isEditing: boolean) => void;
}

export default function NoteCard({ id, title, content, tags = [], onEditStateChange }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [editTitle, setEditTitle] = useState(title);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState("");
  const updateNote = useNoteStore(state => state.updateNote);
  const [hasOverflow, setHasOverflow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Check for content overflow
  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const hasVerticalOverflow = contentRef.current.scrollHeight > contentRef.current.clientHeight;
        setHasOverflow(hasVerticalOverflow);
      }
    };

    // Check initially
    checkOverflow();

    // Set up resize observer to check when dimensions change
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [content]);

  // Fix handleContentClick to handle double-clicks on content
  const handleContentClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.tag-section')) {
      return; // Don't trigger edit mode when clicking tags
    }
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
    onEditStateChange(true);
  };

  // Fix handleTitleDoubleClick
  const handleTitleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTitleEditing(true);
    onEditStateChange(true);
  };

  // Update handleBlur
  const handleBlur = () => {
    setIsEditing(false);
    onEditStateChange(false);
    if (editContent !== content) {
      updateNote(id, { content: editContent });
    }
  };

  // Update handleTitleBlur
  const handleTitleBlur = () => {
    setIsTitleEditing(false);
    onEditStateChange(false);
    if (editTitle !== title) {
      updateNote(id, { title: editTitle });
    }
  };

  // Handle escape key to cancel editing
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      onEditStateChange(false);
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

  const handleDeleteTag = (tagToDelete: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToDelete);
    updateNote(id, { tags: updatedTags });
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      const updatedTags = [...tags, newTag.trim()];
      updateNote(id, { tags: updatedTags });
      setNewTag("");
      setIsAddingTag(false);
    } else if (e.key === 'Escape') {
      setIsAddingTag(false);
      setNewTag("");
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
              e.stopPropagation();
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
            onKeyDown={(e) => {
              e.stopPropagation();
              handleKeyDown(e);
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            autoFocus
          />
        ) : (
          <div
            className="cursor-text h-full flex flex-col"
            onDoubleClick={handleContentClick}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Content area will shrink when space is limited */}
            <div className="note-content-wrapper min-h-0 flex-1">
              <div
                ref={contentRef}
                className={`markdown-content ${hasOverflow ? 'has-overflow' : ''}`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" />
                    ),
                    img: ({ node, ...props }) => (
                      <img {...props} style={{ maxWidth: '100%', height: 'auto' }} />
                    ),
                    code: ({ node, inline, className, children, ...props }: {
                      node?: any;
                      inline?: boolean;
                      className?: string;
                      children?: React.ReactNode;
                    }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      return inline ? (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      ) : (
                        <pre className={className}>
                          <code className={match ? `language-${match[1]}` : ''} {...props}>
                            {children}
                          </code>
                        </pre>
                      );
                    },
                    blockquote: ({ node, ...props }) => (
                      <blockquote {...props} />
                    ),
                    ul: (props) => <ul {...props} />,
                    ol: (props) => <ol {...props} />
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>

            {/* Tags section */}
            <div
              className="tag-section flex flex-wrap mt-2 pt-2 border-t border-border flex-shrink-0 group"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {tags.map((tag) => (
                <TagBadge
                  key={tag}
                  tag={tag}
                  onDelete={() => handleDeleteTag(tag)}
                />
              ))}

              {isAddingTag ? (
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    handleAddTag(e);
                  }}
                  onBlur={() => {
                    setIsAddingTag(false);
                    setNewTag("");
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="bg-transparent border-none text-sm focus:outline-none mr-2 mb-1"
                  placeholder="Enter tag..."
                  autoFocus
                />
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAddingTag(true);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground hover:text-foreground mr-2 mb-1"
                >
                  + Add tag
                </button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
