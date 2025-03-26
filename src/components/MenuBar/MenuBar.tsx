import { Grid2X2, FolderKanban, GitGraph } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useViewStore } from "../../store/ViewStore"
import type { ViewType } from "../../store/ViewStore"
import { cn } from "@/lib/utils"

export default function MenuBar() {
  const { currentView, setView } = useViewStore()

  const viewOptions: { type: ViewType; icon: React.ReactNode; label: string }[] = [
    { type: 'masonry', icon: <Grid2X2 className="h-5 w-5" />, label: 'Masonry View' },
    { type: 'folders', icon: <FolderKanban className="h-5 w-5" />, label: 'Folder View' },
    { type: 'graph', icon: <GitGraph className="h-5 w-5" />, label: 'Graph View' },
  ]

  return (
    <div className="w-full h-full flex items-center justify-between px-4">
      {/* Left section - View toggles */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5 bg-secondary/20 p-1.5 rounded-lg">
          {viewOptions.map(({ type, icon, label }) => (
            <Button
              key={type}
              variant={currentView === type ? "default" : "ghost"}
              size="default"
              onClick={() => setView(type)}
              title={label}
              className={cn(
                "transition-all duration-200 relative px-4 py-2 button-reset",
                "!outline-none !ring-0 !focus:outline-none !focus:ring-0 !focus-visible:ring-0 !focus-visible:outline-none",
                currentView === type ? [
                  "bg-[#e0e7ff]", // Pastel indigo/lilac color
                  "dark:bg-[#4f46e5]/20", // Darker theme equivalent
                  "text-[#4f46e5]", // Indigo text for light theme
                  "dark:text-[#818cf8]", // Lighter indigo for dark theme
                  "shadow-lg",
                  "hover:bg-[#e0e7ff]",
                  "dark:hover:bg-[#4f46e5]/20",
                  "after:content-['']",
                  "after:absolute",
                  "after:bottom-0",
                  "after:left-1/2",
                  "after:-translate-x-1/2",
                  "after:w-1/3",
                  "after:h-[2px]",
                  "after:bg-[#4f46e5]",
                  "after:rounded-full"
                ] : [
                  "hover:bg-background/50",
                  "hover:text-primary"
                ]
              )}
            >
              {icon}
            </Button>
          ))}
        </div>
      </div>

      {/* Middle section - Search bar */}
      <div className="flex-1 flex justify-center max-w-2xl">
        {/* Placeholder for search bar */}
      </div>

      {/* Right section - Reorder button */}
      <div className="flex items-center">
        {/* Placeholder for reorder button */}
      </div>
    </div>
  )
}