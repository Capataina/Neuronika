import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useNoteStore } from "../../store/NoteStore"
import Fuse from 'fuse.js'
import { useState, useMemo } from 'react'

export default function SemanticSearch() {
  const notes = useNoteStore((state) => state.notes)
  const setSearchResults = useNoteStore((state) => state.setSearchResults)
  const [searchQuery, setSearchQuery] = useState('')

  // Initialize Fuse instance with our notes with improved configuration
  const fuse = useMemo(() => new Fuse(notes, {
    keys: [
      { name: 'title', weight: 2 }, // Give title higher weight
      { name: 'content', weight: 1.5 },
      { name: 'tags', weight: 1 }
    ],
    includeScore: true,
    threshold: 0.4, // More lenient matching
    ignoreLocation: true, // Don't penalize matches based on position in text
    minMatchCharLength: 2, // Minimum characters that must match
    shouldSort: true, // Sort results by score
  }), [notes])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query) {
      const results = fuse.search(query)
      // Preserve all note properties including contentSize
      const filteredNotes = results.map(result => ({
        ...result.item,
        contentSize: result.item.contentSize || 1 // Ensure contentSize is preserved
      }))
      setSearchResults(filteredNotes)
    } else {
      // If search is empty, show all notes
      setSearchResults(null)
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
