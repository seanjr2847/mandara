"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FullMandal } from "@/components/result/full-mandal";
import { CustomizationOptions } from "@/components/share/customization-options";
import { ShareDialog } from "@/components/result/share-dialog";
import { themes, fonts } from "@/lib/share-customization";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMandalStore } from "@/store/mandal";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [theme, setTheme] = useState("dark");
  const [font, setFont] = useState("default");
  const [showAuthor, setShowAuthor] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [mandalId, setMandalId] = useState<string | undefined>(undefined);
  const { mainGoal, subGoals, subGoalDetails, reset: resetMandal } = useMandalStore();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setMandalId(id);
    }
  }, [searchParams]);

  const handleCreateNew = () => {
    resetMandal();
    localStorage.removeItem("mandalHistory");
    router.push("/create");
  };

  return (
    <main className={cn(
      "min-h-screen py-8 px-4",
      themes[theme as keyof typeof themes].background
    )}>
      <div className="max-w-7xl mx-auto space-y-8">
        <FullMandal
          theme={themes[theme as keyof typeof themes]}
          font={fonts[font as keyof typeof fonts]}
          showAuthor={showAuthor}
          showDate={showDate}
          mainGoal={mainGoal}
          subGoals={subGoals}
          subGoalDetails={subGoalDetails}
        />

        <div className="bg-slate-800 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-slate-100">커스터마이즈</h2>
          <CustomizationOptions
            theme={theme}
            font={font}
            showAuthor={showAuthor}
            showDate={showDate}
            onThemeChange={setTheme}
            onFontChange={setFont}
            onShowAuthorChange={setShowAuthor}
            onShowDateChange={setShowDate}
          />
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handleCreateNew}>
            새로운 만다라트 만들기
          </Button>
          <ShareDialog
            mandalId={mandalId}
            theme={themes[theme as keyof typeof themes]}
            font={fonts[font as keyof typeof fonts]}
            showAuthor={showAuthor}
            showDate={showDate}
          />
        </div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ResultContent />
    </Suspense>
  );
}
