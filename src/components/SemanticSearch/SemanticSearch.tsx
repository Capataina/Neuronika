import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useNoteStore } from "../../store/NoteStore"
import Fuse from 'fuse.js'
import { useState, useMemo } from 'react'
import { BiDirectionalMapping } from "../../MathUtils/BiDirectionalMapping"
import { SemanticMapping } from "../../store/SemanticMapping"

// Define the type for our note with semantic content
interface NoteWithSemantic {
  id: string;
  title: string;
  content: string;
  contentSize: number;
  tags: string[];
  semanticContent: string;
}

export default function SemanticSearch() {
  const notes = useNoteStore((state) => state.notes)
  const setSearchResults = useNoteStore((state) => state.setSearchResults)
  const [searchQuery, setSearchQuery] = useState('')

  // Initialize bidirectional mapping
  const bidirectionalMapping = useMemo(() => {
    const mapping = new BiDirectionalMapping(SemanticMapping);
    return mapping;
  }, []);

  // Prepare notes with semantic content
  const notesWithSemanticContent = useMemo(() => {
    return notes.map(note => {
      // Extract all words from title and content
      const words = new Set([
        ...(note.title?.toLowerCase().split(/\s+/) || []),
        ...(note.content?.toLowerCase().split(/\s+/) || []),
        ...(note.tags || []).map(tag => tag.toLowerCase())
      ]);

      // Get related words for each word in the note
      const relatedWords = Array.from(words).flatMap(word =>
        bidirectionalMapping.getRelatedWords(word)
      );

      // Create semantic content by combining original content with related words
      const semanticContent = relatedWords.join(' ');

      return {
        ...note,
        semanticContent
      };
    });
  }, [notes, bidirectionalMapping]);

  // Initialize Fuse instance with our enhanced notes
  const fuse = useMemo(() => new Fuse(notesWithSemanticContent, {
    keys: [
      { name: 'title', weight: 3 },    // Highest priority for title matches
      { name: 'content', weight: 2 },   // High priority for content matches
      { name: 'tags', weight: 1.5 },    // Medium priority for tag matches
      { name: 'semanticContent', weight: 0.5 } // Lower priority for semantic matches
    ],
    includeScore: true,
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 2,
    shouldSort: true,
    getFn: (obj: NoteWithSemantic, path: string | string[]) => {
      // Handle array path
      if (Array.isArray(path)) {
        path = path.join('.');
      }

      // Get the value using path
      const value = path
        .split('.')
        .reduce((current: any, key: string) => (current ? current[key] : undefined), obj);

      // Convert arrays to string and handle undefined/null
      if (Array.isArray(value)) {
        return value.join(' ');
      }
      return value?.toString() || '';
    }
  }), [notesWithSemanticContent]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawQuery = e.target.value;
    setSearchQuery(rawQuery); // Set the raw query value to maintain spaces in the input

    if (rawQuery.trim()) { // Only trim when checking if there's a valid search
      const results = fuse.search(rawQuery); // Use raw query for searching to maintain spaces

      // Process and sort results
      const processedResults = results
        .map(result => {
          // Calculate a normalized score (0 to 1, where 1 is best)
          const normalizedScore = result.score ? 1 - result.score : 1;

          // Create weighted score based on match type
          let weightedScore = normalizedScore;
          if (result.matches) {
            // Boost score for title matches
            if (result.matches.some(match => match.key === 'title')) {
              weightedScore *= 2;
            }
            // Slightly boost score for content matches
            if (result.matches.some(match => match.key === 'content')) {
              weightedScore *= 1.5;
            }
          }

          return {
            ...result.item,
            contentSize: result.item.contentSize || 1,
            _score: weightedScore // Keep score for debugging if needed
          };
        })
        .sort((a, b) => (b._score || 0) - (a._score || 0)) // Sort by weighted score
        .map(({ semanticContent, _score, ...rest }) => rest); // Remove internal fields

      setSearchResults(processedResults);
    } else {
      setSearchResults(null);
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full pl-8"
      />
    </div>
  )
}
