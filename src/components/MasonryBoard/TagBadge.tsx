import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface TagBadgeProps {
  tag: string;
  onDelete?: () => void;
}

export function TagBadge({ tag, onDelete }: TagBadgeProps) {
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
      {tag}
    </Badge>
  );
}
