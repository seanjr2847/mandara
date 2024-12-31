"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FullMandal } from "@/components/share/full-mandal";
import { useRouter } from "next/navigation";

interface SharedMandalData {
  success: boolean;
  error?: string;
  mandal?: {
    id: string;
    mainGoal: string;
    subGoals: string;
    subGoalDetails: string;
    createdAt: string;
    likeCount: number;
    viewCount: number;
  };
}

export default function SharePage() {
  const router = useRouter();
  const params = useParams();
  const [mainGoal, setMainGoal] = useState("");
  const [subGoals, setSubGoals] = useState<string[]>([]);
  const [subGoalDetails, setSubGoalDetails] = useState<{ title: string; tasks: string[] }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMandal = async () => {
      try {
        const response = await fetch(`/api/share/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch mandal");
        }
        
        const data: SharedMandalData = await response.json();
        if (data.success && data.mandal) {
          setMainGoal(data.mandal.mainGoal);
          setSubGoals(JSON.parse(data.mandal.subGoals));
          setSubGoalDetails(JSON.parse(data.mandal.subGoalDetails));
        } else {
          throw new Error(data.error || "Failed to fetch mandal");
        }
      } catch (error) {
        console.error("Error fetching mandal:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchMandal();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 py-8 px-4">
        <div className="container max-w-screen-lg mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">만다라트</h1>
            <Button onClick={() => router.push("/create")}>새로 만들기</Button>
          </div>
          <div className="text-center py-8 text-slate-300">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!mainGoal || subGoals.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 py-8 px-4">
        <div className="container max-w-screen-lg mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">만다라트</h1>
            <Button onClick={() => router.push("/create")}>새로 만들기</Button>
          </div>
          <div className="text-center py-8">
            <p className="text-slate-300">만다라트를 찾을 수 없습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="container max-w-screen-lg mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">만다라트</h1>
          <Button onClick={() => router.push("/create")}>새로 만들기</Button>
        </div>

        <FullMandal
          mainGoal={mainGoal}
          subGoals={subGoals}
          subGoalDetails={subGoalDetails}
        />
      </div>
    </main>
  );
}
