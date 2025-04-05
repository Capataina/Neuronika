import { useState, useEffect, useMemo } from 'react';
import { useNoteStore } from '../../store/NoteStore';
import { getAllTags } from '../../MathUtils/AllTags';
import { Badge } from '@/components/ui/badge';
import MasonryBoard from '../MasonryBoard/MasonryBoard';
import { cn } from '@/lib/utils';

export default function DynamicFolders() {
  const notes = useNoteStore((state) => state.notes);
  const setSearchResults = useNoteStore((state) => state.setSearchResults);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = getAllTags(notes);

  // Calculate which tags are compatible with the current selection
  const compatibleTags = useMemo(() => {
    if (selectedTags.length === 0) {
      return new Set(tags.map(t => t.tag));
    }

    // Get all notes that have ALL currently selected tags
    const notesWithSelectedTags = notes.filter(note =>
      selectedTags.every(tag => note.tags.includes(tag))
    );

    // Get all tags that appear in at least one note with the selected tags
    const compatibleTagSet = new Set<string>();
    notesWithSelectedTags.forEach(note => {
      note.tags.forEach(tag => compatibleTagSet.add(tag));
    });

    return compatibleTagSet;
  }, [selectedTags, notes, tags]);

  // Filter notes based on selected tags
  useEffect(() => {
    if (selectedTags.length > 0) {
      const filteredNotes = notes.filter(note =>
        selectedTags.every(tag => note.tags.includes(tag))
      );
      setSearchResults(filteredNotes);
    } else {
      setSearchResults(null);
    }
  }, [selectedTags, notes, setSearchResults]);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        // Remove the tag if it's already selected
        return prev.filter(t => t !== tag);
      } else {
        // Add the tag if it's compatible
        return [...prev, tag];
      }
    });
  };

  return (
    <div className="flex h-full">
      {/* Left sidebar with tags */}
      <div className="w-64 border-r border-border p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => {
            const isSelected = selectedTags.includes(tag);
            const isCompatible = compatibleTags.has(tag);

            return (
              <Badge
                key={tag}
                variant={isSelected ? "default" : "secondary"}
                className={cn(
                  "cursor-pointer transition-opacity",
                  !isCompatible && !isSelected && "opacity-40 cursor-not-allowed"
                )}
                onClick={() => isCompatible && handleTagClick(tag)}
              >
                {tag} ({count})
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Right side with filtered notes */}
      <div className="flex-1">
        <MasonryBoard />
      </div>
    </div>
  );
}
