"use client";

import { LikeButton } from "@/components/share/like-button";
import { FullMandal } from "@/components/share/full-mandal";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { themes, fonts, Font } from "@/lib/share-customization";
import { cn } from "@/lib/utils";

interface SharedMandalData {
  id: string;
  mainGoal: string;
  subGoals: string;
  subGoalDetails: string;
  createdAt: string;
  theme: string;
  font: keyof typeof fonts;
  likeCount: number;
  viewCount: number;
}

interface GroupedSubGoalDetails {
  title: string;
  tasks: string[];
}

export default function SharePage() {
  const params = useParams();
  const mandalId = typeof params.id === "string" ? params.id : params.id?.[0];
  const [mainGoal, setMainGoal] = useState("");
  const [subGoals, setSubGoals] = useState<string[]>([]);
  const [subGoalDetails, setSubGoalDetails] = useState<string[]>([]);
  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState<keyof typeof fonts>("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likeCount, setLikeCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    const fetchSharedMandal = async () => {
      try {
        const response = await fetch(`/api/share/${mandalId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch shared mandal");
        }
        const data: SharedMandalData = await response.json();
        setMainGoal(data.mainGoal);
        
        // Parse subGoals and subGoalDetails
        const parsedSubGoals = JSON.parse(data.subGoals);
        const parsedSubGoalDetails = JSON.parse(data.subGoalDetails);
        
        setSubGoals(parsedSubGoals);
        setSubGoalDetails(parsedSubGoalDetails);
        
        setCreatedAt(data.createdAt);
        setTheme(data.theme);
        setFont(data.font);
        setLikeCount(data.likeCount);
        setViewCount(data.viewCount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shared mandal:", error);
        setError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    if (mandalId) {
      fetchSharedMandal();
    }
  }, [mandalId]);

  if (!mandalId) {
    return <div>잘못된 접근입니다.</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // subGoalDetails를 8개씩 그룹화하여 result 페이지와 동일한 형태로 변환
  const groupedSubGoalDetails: GroupedSubGoalDetails[] = subGoals.map((subGoal, index) => ({
    title: subGoal,
    tasks: subGoalDetails.slice(index * 8, (index + 1) * 8)
  }));

  const selectedFont: Font = fonts[font];

  return (
    <main className={cn(
      "min-h-screen py-8 px-4",
      themes[theme as keyof typeof themes].background,
      themes[theme as keyof typeof themes].text,
      selectedFont.className
    )}>
      <div className="container max-w-screen-xl mx-auto space-y-8">
        <FullMandal
          theme={themes[theme as keyof typeof themes]}
          font={selectedFont}
          mainGoal={mainGoal}
          subGoals={subGoals}
          subGoalDetails={groupedSubGoalDetails}
          showAuthor={true}
          showDate={true}
        />

        {createdAt && (
          <div className="text-sm text-muted-foreground">
            <p>작성일: {new Date(createdAt).toLocaleDateString()}</p>
          </div>
        )}
        
        <div className="flex items-center gap-4">
          <LikeButton mandalId={mandalId} initialLikeCount={likeCount} />
          <span className="text-sm text-muted-foreground">
            조회수: {viewCount}
          </span>
        </div>
      </div>
    </main>
  );
}
