import { cn } from "@/lib/utils";

interface SharedMandalViewerProps {
  mainGoal: string;
  subGoals: string[];
  className?: string;
}

export function SharedMandalViewer({
  mainGoal,
  subGoals,
  className,
}: SharedMandalViewerProps) {
  return (
    <div className={cn("grid grid-cols-3 gap-1", className)}>
      {[...Array(9)].map((_, index) => {
        const isCenter = index === 4;
        const content = isCenter ? mainGoal : subGoals[index > 4 ? index - 1 : index];
        
        return (
          <div
            key={index}
            className={cn(
              "aspect-square flex items-center justify-center p-1 text-xs md:text-sm text-center",
              isCenter ? "bg-red-100" : "bg-gray-50"
            )}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
