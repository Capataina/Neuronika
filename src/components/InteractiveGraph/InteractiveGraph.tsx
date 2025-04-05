import { useEffect, useRef } from 'react';
import { Network, Options, Edge, Node } from 'vis-network';
import { DataSet } from 'vis-data';
import { useNoteStore } from '../../store/NoteStore';
import { getTagRelations } from '../../MathUtils/TagRelations';

export default function InteractiveGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const notes = useNoteStore(state => state.notes);

  useEffect(() => {
    if (!containerRef.current) return;

    // Get tag relations
    const tagRelations = getTagRelations(notes);

    // Create nodes dataset
    const nodes = new DataSet<Node>([]);

    // Create edges dataset
    const edges = new DataSet<Edge>([]);

    // Add tag nodes
    tagRelations.forEach(relation => {
      nodes.add({
        id: `tag_${relation.tag}`,
        label: relation.tag,
        value: relation.count * 3, // Increased scaling factor
        group: 'tag',
        title: `Used in ${relation.count} notes`,
        font: {
          size: 24, // Much larger font
          face: 'Arial',
          color: 'white',
          strokeWidth: 4, // Thicker stroke
          strokeColor: '#000000'
        }
      });

      // Add edges to related tags
      relation.relatedTags.forEach(relatedTag => {
        edges.add({
          from: `tag_${relation.tag}`,
          to: `tag_${relatedTag.tag}`,
          value: relatedTag.count
        });
      });

      // Add note nodes and connect them to their tags
      relation.notes.forEach(note => {
        const noteId = `note_${note.id}`;

        // Only add the note node if it hasn't been added yet
        if (!nodes.get(noteId)) {
          nodes.add({
            id: noteId,
            label: note.title,
            value: 2, // Increased base size for notes
            group: 'note',
            title: note.title,
            font: {
              size: 20, // Larger font for notes
              face: 'Arial',
              color: 'white',
              strokeWidth: 4, // Thicker stroke
              strokeColor: '#000000'
            }
          });
        }

        // Connect note to its tag
        edges.add({
          from: `tag_${relation.tag}`,
          to: noteId,
          value: 1
        });
      });
    });

    // Network options
    const options: Options = {
      nodes: {
        shape: 'dot',
        scaling: {
          min: 30, // Larger minimum size
          max: 60, // Larger maximum size
          label: {
            enabled: true,
            min: 20, // Minimum font size
            max: 32, // Maximum font size
            drawThreshold: 3
          }
        },
        font: {
          size: 24,
          face: 'Arial',
          color: 'white',
          strokeWidth: 4,
          strokeColor: '#000000'
        },
        borderWidth: 3,
        borderWidthSelected: 4,
        shadow: {
          enabled: true,
          color: 'rgba(0,0,0,0.5)',
          size: 15,
          x: 5,
          y: 5
        }
      },
      edges: {
        width: 2, // Thicker edges
        color: {
          inherit: 'from',
          opacity: 0.8
        },
        smooth: {
          enabled: true,
          type: 'continuous',
          roundness: 0.5
        },
        font: {
          size: 16,
          face: 'Arial',
          color: 'white',
          strokeWidth: 4,
          strokeColor: '#000000',
          align: 'middle'
        }
      },
      physics: {
        stabilization: {
          enabled: true,
          iterations: 100
        },
        barnesHut: {
          gravitationalConstant: -80000,
          springConstant: 0.001,
          springLength: 250 // Increased spacing
        }
      },
      groups: {
        tag: {
          color: {
            background: '#2ecc71', // Brighter green
            border: '#27ae60',
            highlight: {
              background: '#27ae60',
              border: '#219a52'
            },
            hover: {
              background: '#27ae60',
              border: '#219a52'
            }
          },
          font: {
            color: 'white',
            size: 24,
            face: 'Arial',
            strokeWidth: 4,
            strokeColor: '#000000'
          }
        },
        note: {
          color: {
            background: '#3498db', // Brighter blue
            border: '#2980b9',
            highlight: {
              background: '#2980b9',
              border: '#2573a7'
            },
            hover: {
              background: '#2980b9',
              border: '#2573a7'
            }
          },
          font: {
            color: 'white',
            size: 20,
            face: 'Arial',
            strokeWidth: 4,
            strokeColor: '#000000'
          }
        }
      }
    };

    // Create the network
    const network = new Network(
      containerRef.current,
      { nodes, edges },
      options
    );

    // Store network reference
    networkRef.current = network;

    // Cleanup
    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, [notes]);

  return (
    <div className="w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
