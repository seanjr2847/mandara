"use client";

import { initializeKakao } from "@/lib/kakao";
import { toast } from "sonner";
import { useEffect } from "react";
import Image from "next/image";

interface ShareButtonsProps {
  shareUrl: string;
}

export const ShareButtons = ({ shareUrl }: ShareButtonsProps) => {
  useEffect(() => {
    initializeKakao();
  }, []);

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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("링크가 복사되었습니다.");
    } catch {
      toast.error("링크 복사에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleKakaoShare}
        className="flex items-center justify-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
      >
        <Image
          src="/kakao.svg"
          alt="카카오톡으로 공유하기"
          width={20}
          height={20}
        />
        카카오톡으로 공유하기
      </button>
      <button
        onClick={handleCopyLink}
        className="flex items-center justify-center gap-2 bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        링크 복사하기
      </button>
    </div>
  );
};
