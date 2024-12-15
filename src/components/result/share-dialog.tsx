"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import html2canvas from "html2canvas";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { initializeKakao } from "@/lib/kakao";
import { Theme, Font, themes, fonts } from "@/lib/share-customization";

interface ShareDialogProps {
  mandalId?: string;
  theme: Theme;
  font: Font;
  showAuthor: boolean;
  showDate: boolean;
}

export function ShareDialog({
  mandalId,
  theme,
  font,
  showAuthor,
  showDate,
}: ShareDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!shareUrl && mandalId) {
      const url = new URL(`${window.location.origin}/share/${mandalId}`);
      url.searchParams.set("theme", Object.entries(themes).find(([, t]) => t === theme)?.[0] || "default");
      url.searchParams.set("font", Object.entries(fonts).find(([, f]) => f === font)?.[0] || "default");
      url.searchParams.set("author", showAuthor ? "1" : "0");
      url.searchParams.set("date", showDate ? "1" : "0");
      setShareUrl(url.toString());
    }
    initializeKakao();
  }, [mandalId, theme, font, showAuthor, showDate, shareUrl]);

  const handleExportImage = async () => {
    const element = document.getElementById("mandal-chart");
    if (!element) return;

    setIsLoading(true);
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#020817",
        scale: 2,
      });
      
      const link = document.createElement("a");
      link.download = "mandara-chart.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("이미지가 저장되었습니다!");
    } catch (error) {
      console.error("이미지 내보내기 실패:", error);
      toast.error("이미지 내보내기에 실패했습니다.");
    }
    setIsLoading(false);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("URL이 클립보드에 복사되었습니다!");
    } catch (error) {
      console.error("URL 복사 실패:", error);
      toast.error("URL 복사에 실패했습니다.");
    }
  };

  const handleKakaoShare = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '만다라 차트',
          description: '나의 만다라 차트를 확인해보세요!',
          imageUrl: `${window.location.origin}/og-image.jpg`,
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    } else {
      toast.error("카카오톡 SDK를 불러오는데 실패했습니다.");
    }
  };

  const handleInstagramShare = () => {
    window.open('instagram://camera');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-red-500 hover:bg-red-600"
        >
          공유하기
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>만다라트 공유하기</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <button
              onClick={handleKakaoShare}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#FFE812] hover:bg-[#FFE000] transition-colors"
            >
              <Image src="/kakao.svg" alt="KakaoTalk" width={24} height={24} />
              <span className="text-[#381F1F]">카카오톡 공유</span>
            </button>
            
            <button
              onClick={handleInstagramShare}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#E09B3D] to-[#C21975] hover:opacity-90 transition-opacity text-white"
            >
              <Image src="/instagram.svg" alt="Instagram" width={24} height={24} />
              <span>Instagram 공유</span>
            </button>
          </div>

          <Button
            variant="outline"
            onClick={handleExportImage}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "내보내는 중..." : "이미지로 내보내기"}
          </Button>

          <div className="flex gap-2">
            <Input
              value={shareUrl}
              readOnly
              placeholder="공유 URL이 여기에 표시됩니다"
            />
            <Button
              variant="outline"
              onClick={handleCopyUrl}
            >
              URL 복사
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
