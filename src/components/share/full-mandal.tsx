import { Theme, Font } from "@/lib/share-customization";
import { Mandal } from "@/types/mandal";

interface FullMandalProps {
  data: Mandal;
  theme: Theme;
  font: Font;
  showAuthor: boolean;
  showDate: boolean;
}

interface SubMandalProps {
  subGoal: string;
  details: string[];
  theme: Theme;
}

function SubMandal({ subGoal, details, theme }: SubMandalProps) {
  // 3x3 그리드의 각 셀 위치에 대한 인덱스 매핑
  const cellOrder = [0, 1, 2, 7, -1, 3, 6, 5, 4];

  return (
    <div className="grid grid-cols-3 gap-1">
      {cellOrder.map((detailIndex, position) => {
        const content = position === 4 ? (subGoal || "") : (details[detailIndex] || "");
        return (
          <div
            key={position}
            className={`p-2 rounded border ${theme.border} ${theme.text} ${
              position === 4 ? theme.background : ""
            }`}
          >
            <p className="text-xs font-bold mb-1 break-all">
              {content}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function FullMandal({
  data,
  theme,
  font,
  showAuthor,
  showDate,
}: FullMandalProps) {
  // 3x3 그리드의 각 위치에 대한 인덱스 매핑
  const gridOrder = [0, 1, 2, 7, 4, 3, 6, 5];

  return (
    <div className={`p-6 rounded-lg ${theme.background} ${font.className}`}>
      {/* 메인 그리드 */}
      <div className="grid grid-cols-3 gap-4">
        {gridOrder.map((index) => (
          <SubMandal
            key={index}
            subGoal={data.subGoals[index] || ""}
            details={data.subGoalDetails[index]?.tasks || Array(8).fill("")}
            theme={theme}
          />
        ))}
      </div>

      {/* 메인 목표 */}
      <div className={`mt-4 p-4 rounded border ${theme.border} ${theme.text} text-center`}>
        <h2 className="text-lg font-bold">{data.mainGoal || ""}</h2>
      </div>

      {/* 작성자 및 날짜 정보 */}
      {(showAuthor || showDate) && (
        <div className={`mt-4 text-sm ${theme.text}`}>
          {showAuthor && <p>작성자: {data.author || ""}</p>}
          {showDate && (
            <p>작성일: {new Date(data.createdAt || new Date()).toLocaleDateString()}</p>
          )}
        </div>
      )}
    </div>
  );
}
