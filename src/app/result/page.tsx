"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FullMandal } from "@/components/share/full-mandal";
import { useRouter } from "next/navigation";
import { useMandalStore } from "@/store/mandal";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mainGoal, subGoals, subGoalDetails, reset: resetMandal } = useMandalStore();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      // Removed the line that sets mandalId
    }
  }, [searchParams]);

  const handleCreateNew = () => {
    resetMandal();
    router.push("/create");
  };

  const handleShare = async () => {
    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mainGoal,
          subGoals,
          subGoalDetails
        }),
      });

      const data = await response.json();
      if (data.success) {
        // toast({
        //   title: "공유 링크가 생성되었습니다",
        //   description: "클립보드에 복사되었습니다.",
        // });
        await navigator.clipboard.writeText(
          `${window.location.origin}/share/${data.id}`
        );
      } else {
        throw new Error("Failed to share");
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="container max-w-screen-lg mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-white">만다라트 결과</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              onClick={handleCreateNew}
              className="bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700 hover:text-white"
            >
              새로운 만다라트 만들기
            </Button>
            <Button
              onClick={handleShare}
              className="bg-slate-700 hover:bg-slate-600"
            >
              공개하기
            </Button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <FullMandal
            mainGoal={mainGoal}
            subGoals={subGoals}
            subGoalDetails={subGoalDetails}
          />
        </div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense>
      <ResultContent />
    </Suspense>
  );
}
