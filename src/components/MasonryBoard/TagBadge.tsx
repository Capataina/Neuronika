import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

interface TagBadgeProps {
  tag: string;
  onDelete?: () => void;
  onUpdate?: (newTag: string) => void;
}

export function TagBadge({ tag, onDelete, onUpdate }: TagBadgeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(tag);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue.trim() !== tag && editValue.trim() !== "") {
      onUpdate?.(editValue.trim());
    } else {
      setEditValue(tag);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      (e.target as HTMLInputElement).blur();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditValue(tag);
    }
  };

  return (
    <Badge
      variant="secondary"
      className="mr-1 mb-1 group relative flex items-center"
      onClick={(e) => e.stopPropagation()}
    >
      {onDelete && (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
        >
          <X className="w-3 h-3 mr-1 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity" />
        </div>
      )}
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none p-0 focus:outline-none w-full text-xs"
          autoFocus
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        />
      ) : (
        <span onDoubleClick={handleDoubleClick} className="cursor-text">
          {tag}
        </span>
      )}
    </Badge>
  );
}
