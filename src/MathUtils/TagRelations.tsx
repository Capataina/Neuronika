import { Note } from '../store/NoteStore';

export interface TagRelation {
  tag: string;
  count: number;
  relatedTags: {
    tag: string;
    count: number;
  }[];
  notes: {
    id: string;
    title: string;
  }[];
}

export function getTagRelations(notes: Note[]): TagRelation[] {
  // Create a map to store tag relations
  const tagRelations = new Map<string, TagRelation>();

  // First pass: Initialize tag relations with empty arrays
  notes.forEach(note => {
    note.tags.forEach(tag => {
      if (!tagRelations.has(tag)) {
        tagRelations.set(tag, {
          tag,
          count: 0,
          relatedTags: [],
          notes: []
        });
      }
    });
  });

  // Second pass: Count tag occurrences and build relationships
  notes.forEach(note => {
    note.tags.forEach(tag => {
      const relation = tagRelations.get(tag)!;
      relation.count++;

      // Add note to the tag's notes array
      relation.notes.push({
        id: note.id,
        title: note.title
      });

      // Add related tags
      note.tags.forEach(relatedTag => {
        if (relatedTag !== tag) {
          const existingRelation = relation.relatedTags.find(rt => rt.tag === relatedTag);
          if (existingRelation) {
            existingRelation.count++;
          } else {
            relation.relatedTags.push({
              tag: relatedTag,
              count: 1
            });
          }
        }
      });
    });
  });

  // Sort related tags by count (descending)
  tagRelations.forEach(relation => {
    relation.relatedTags.sort((a, b) => b.count - a.count);
  });

  // Convert to array and sort by count (descending)
  return Array.from(tagRelations.values())
    .sort((a, b) => b.count - a.count);
}
