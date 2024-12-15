"use client";

import { cn } from "@/lib/utils";
import { Theme, Font } from "@/lib/share-customization";
import { useMandalStore } from "@/store/mandal";

interface FullMandalProps {
  theme: Theme;
  font: Font;
  showAuthor: boolean;
  showDate: boolean;
}

export function FullMandal({
  theme,
  font,
  showAuthor,
  showDate,
}: FullMandalProps) {
  const { mainGoal, subGoals, subGoalDetails } = useMandalStore();

  const renderCell = (text: string, isCenter: boolean = false, isMainCell: boolean = false) => (
    <div
      className={cn(
        "relative w-[100px] h-[100px] border",
        theme.border,
        {
          [theme.background]: isCenter || isMainCell,
          "bg-slate-900": !isCenter && !isMainCell,
        }
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full px-2 text-center">
          <span className="text-white text-xs leading-tight line-clamp-4">
            {text}
          </span>
        </div>
      </div>
    </div>
  );

  const renderSubMandal = (mainIndex: number) => {
    // 인덱스가 범위를 벗어나면 빈 데이터 반환
    if (mainIndex < 0 || mainIndex >= 8) {
      return (
        <div className="grid grid-cols-3 w-[300px] h-[300px]">
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <div key={`${mainIndex}-${row}-${col}`} className="w-[100px] h-[100px]">
                {renderCell("", row === 1 && col === 1)}
              </div>
            ))
          )}
        </div>
      );
    }

    const subGoal = subGoals[mainIndex] || "";
    const details = subGoalDetails[mainIndex]?.tasks || Array(8).fill("");
    
    console.log(`MainIndex: ${mainIndex}`);
    console.log('SubGoal:', subGoal);
    console.log('Details:', details);

    const getDetailIndex = (row: number, col: number) => {
      if (row === 1 && col === 1) return -1; // 중앙
      
      // 시계방향으로 인덱스 매핑 (좌상단부터 시작)
      if (row === 0 && col === 0) return 0;
      if (row === 0 && col === 1) return 1;
      if (row === 0 && col === 2) return 2;
      if (row === 1 && col === 2) return 3;
      if (row === 2 && col === 2) return 4;
      if (row === 2 && col === 1) return 5;
      if (row === 2 && col === 0) return 6;
      if (row === 1 && col === 0) return 7;
      
      return -1;
    };

    return (
      <div className="grid grid-cols-3 w-[300px] h-[300px]">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => {
            const isCenter = row === 1 && col === 1;
            const detailIndex = getDetailIndex(row, col);
            
            console.log(`Position (${row},${col}):`, {
              isCenter,
              detailIndex,
              content: isCenter ? subGoal : (detailIndex >= 0 ? details[detailIndex] : "")
            });

            return (
              <div key={`${mainIndex}-${row}-${col}`} className="w-[100px] h-[100px]">
                {renderCell(
                  isCenter ? subGoal : (detailIndex >= 0 ? details[detailIndex] || "" : ""),
                  isCenter
                )}
              </div>
            );
          })
        )}
      </div>
    );
  };

  return (
    <div id="mandal-chart" className={cn("bg-slate-900", font.className)}>
      <div className="text-center mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-white">
          {mainGoal}
        </h1>
        <p className="text-white opacity-80">
          목표를 달성하기 위한 세부 계획이 모두 준비되었습니다.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-3 w-[900px] h-[900px]">
          {/* 좌상단 */}
          {renderSubMandal(0)}
          {/* 상단 중앙 */}
          {renderSubMandal(1)}
          {/* 우상단 */}
          {renderSubMandal(2)}
          {/* 좌중단 */}
          {renderSubMandal(3)}
          {/* 중앙 */}
          <div className="grid grid-cols-3 w-[300px] h-[300px]">
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => {
                const index = row * 3 + col;
                const isCenter = row === 1 && col === 1;
                return (
                  <div key={`center-${row}-${col}`} className="w-[100px] h-[100px]">
                    {renderCell(
                      isCenter ? mainGoal : subGoals[index < 4 ? index : index - 1] || "",
                      isCenter,
                      true
                    )}
                  </div>
                );
              })
            )}
          </div>
          {/* 우중단 */}
          {renderSubMandal(4)}
          {/* 좌하단 */}
          {renderSubMandal(5)}
          {/* 하단 중앙 */}
          {renderSubMandal(6)}
          {/* 우하단 */}
          {renderSubMandal(7)}
        </div>
      </div>

      {(showAuthor || showDate) && (
        <div className="mt-6 text-sm text-white opacity-70 text-right space-y-1">
          {showAuthor && <div>작성자: 사용자</div>}
          {showDate && (
            <div>
              작성일: {new Date().toLocaleDateString("ko-KR")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
