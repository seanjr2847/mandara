"use client";

interface MandalPreviewProps {
  mainGoal: string;
  subGoals: string[];
}

export function MandalPreview({ mainGoal, subGoals }: MandalPreviewProps) {
  const renderCell = (content: string, isCenter: boolean = false) => (
    <div
      className={`
        aspect-square p-2 border border-slate-700 flex items-center justify-center text-center
        ${isCenter ? "bg-red-500/20" : "bg-slate-800/50"}
        transition-colors duration-200 hover:bg-slate-700/50
      `}
    >
      <p className="text-sm md:text-base line-clamp-4">{content || "목표를 입력해주세요"}</p>
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => {
            const index = row * 3 + col;
            const isCenter = row === 1 && col === 1;
            return (
              <div key={`${row}-${col}`}>
                {renderCell(isCenter ? mainGoal : subGoals[index - 1] || "", isCenter)}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
