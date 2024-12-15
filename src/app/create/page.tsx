"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMandalStore } from "@/store/mandal";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();
  const { mainGoal, setMainGoal } = useMandalStore();

  const handleNext = () => {
    if (!mainGoal.trim()) {
      alert("중심 목표를 입력해주세요.");
      return;
    }
    router.push("/create/sub-goals");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">새로운 목표 설정</h1>
          <p className="text-slate-400">
            이루고 싶은 중심 목표를 입력해주세요.
            <br />
            구체적이고 명확한 목표일수록 좋습니다.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <label className="block text-lg font-medium">중심 목표</label>
            <Input
              placeholder="예: 건강한 삶 살기"
              value={mainGoal}
              onChange={(e) => setMainGoal(e.target.value)}
              className="text-lg py-6"
            />
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 rounded-full text-lg"
              onClick={handleNext}
            >
              다음 단계로
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
