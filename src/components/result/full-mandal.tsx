"use client";

import { cn } from "@/lib/utils";
import { Theme, Font } from "@/lib/share-customization";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShareButtons } from "@/components/share/share-buttons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe2, Share2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useMandalStore } from "@/store/mandal";

interface FullMandalProps {
  theme: Theme;
  font: Font;
  showAuthor: boolean;
  showDate: boolean;
  mainGoal: string;
  subGoals: string[];
  subGoalDetails: { title: string; tasks: string[] }[];
}

export function FullMandal({
  theme,
  font,
  showAuthor,
  showDate,
  mainGoal = "",
  subGoals = Array(8).fill(""),
  subGoalDetails = Array(8).fill({ title: "", tasks: Array(8).fill("") }),
}: FullMandalProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [sharedId, setSharedId] = useState<string | null>(null);
  const router = useRouter();
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const resetMandal = useMandalStore((state) => state.reset);

  const handlePublish = async () => {
    if (!session) {
      toast({
        title: "로그인이 필요합니다",
        description: "만다라트를 공유하려면 로그인이 필요합니다.",
        variant: "destructive",
      });
      signIn("google");
      return;
    }

    try {
      const flattenedDetails = subGoalDetails.map((detail) => detail.tasks);

      const response = await fetch("/api/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mainGoal,
          subGoals,
          subGoalDetails: flattenedDetails,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // 로컬 히스토리 초기화
        resetMandal();
        localStorage.removeItem("mandalHistory");
        
        toast({
          title: "공유 성공!",
          description: "만다라트가 성공적으로 공유되었습니다.",
        });
        setSharedId(data.id);
        router.push(`/share/${data.id}`);
      } else {
        throw new Error("Failed to share mandal");
      }
    } catch (error) {
      console.error("Error sharing mandal:", error);
      toast({
        title: "공유 실패",
        description: "만다라트 공유 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleCellClick = (text: string) => {
    if (window.innerWidth <= 768 && text.trim()) {
      setSelectedText(text);
    }
  };

  const getDetailIndex = (row: number, col: number) => {
    if (row === 1 && col === 1) return -1;

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

  const renderCell = (text: string, isCenter: boolean = false, isMainCell: boolean = false) => (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center p-2 text-center border overflow-hidden cursor-pointer",
        isMainCell
          ? theme.centerClassName
          : isCenter
          ? theme.centerClassName
          : theme.className,
        font.className,
        theme.label === "라이트" ? "text-black" : "text-white"
      )}
      onClick={() => handleCellClick(text)}
    >
      <span
        className={cn(
          "text-sm break-keep line-clamp-4 overflow-hidden",
          isCenter && "font-bold",
          isMainCell && "text-lg font-bold",
          "md:hover:line-clamp-none md:hover:overflow-visible md:hover:z-10 md:hover:min-h-full md:hover:bg-inherit"
        )}
        title={text}
      >
        {text}
      </span>
    </div>
  );

  const renderSubMandal = (mainIndex: number) => {
    if (mainIndex < 0 || mainIndex >= 8) {
      return (
        <div className="grid grid-cols-3 gap-1">
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <div key={`${mainIndex}-${row}-${col}`} className="aspect-square">
                {renderCell("")}
              </div>
            ))
          )}
        </div>
      );
    }

    const subGoal = subGoals?.[mainIndex] || "";
    const details = subGoalDetails?.[mainIndex]?.tasks;

    return (
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => {
            const isCenter = row === 1 && col === 1;
            const detailIndex = getDetailIndex(row, col);

            return (
              <div key={`${mainIndex}-${row}-${col}`} className="aspect-square">
                {renderCell(
                  isCenter ? subGoal : (detailIndex >= 0 ? details?.[detailIndex] : ""),
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
    <div className="w-full max-w-[900px] mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{mainGoal}</h1>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-1">
          {renderSubMandal(0)}
          {renderSubMandal(1)}
          {renderSubMandal(2)}
          {renderSubMandal(3)}
          <div className="grid grid-cols-3 gap-1">
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => {
                const isCenter = row === 1 && col === 1;
                const index = getDetailIndex(row, col);
                return (
                  <div
                    key={`main-${row}-${col}`}
                    className="aspect-square"
                  >
                    {renderCell(isCenter ? mainGoal : (index >= 0 ? subGoals[index] : ""), isCenter, true)}
                  </div>
                );
              })
            )}
          </div>
          {renderSubMandal(4)}
          {renderSubMandal(5)}
          {renderSubMandal(6)}
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

      <Dialog open={!!selectedText} onOpenChange={() => setSelectedText(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>세부 내용</DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-base">
            {selectedText}
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-8 flex justify-center gap-4">
        <Button
          onClick={handlePublish}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Globe2 className="w-4 h-4" />
          공개하기
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              disabled={!sharedId}
            >
              <Share2 className="w-4 h-4" />
              공유하기
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>만다라트 공유하기</DialogTitle>
              <DialogDescription>
                소셜 미디어에 만다라트를 공유해보세요.
              </DialogDescription>
            </DialogHeader>
            {sharedId && <ShareButtons sharedId={sharedId} />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
