import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NoteCardProps {
  title: string;
  content: string;
}

export default function NoteCard({ title, content }: NoteCardProps) {
  return (
    <Card className="w-full h-full note-card rounded-lg">
      <CardHeader className="note-card-header flex items-center justify-center">
        <CardTitle className="truncate text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="note-card-content">
        <p className="note-content">{content}</p>
      </CardContent>
    </Card>
  );
}
