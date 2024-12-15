"use client";

import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
import Image from "next/image";
import LinkIcon from "@/components/icons/link-icon";
import { initializeKakao } from "@/lib/kakao";
import { toast } from "sonner";
import { useEffect } from "react";

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

  const handleInstagramShare = () => {
    // Instagram은 직접적인 공유 API를 제공하지 않아서 
    // 이미지를 다운로드하고 Instagram 앱을 여는 방식으로 구현
    window.open('instagram://camera');
  };

  return (
    <div className="flex gap-4 items-center justify-center mt-4">
      <button
        onClick={handleKakaoShare}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFE812] hover:bg-[#FFE000] transition-colors"
      >
        <Image src="/kakao.svg" alt="KakaoTalk" width={24} height={24} />
        <span className="text-[#381F1F]">카카오톡 공유</span>
      </button>
      
      <button
        onClick={handleInstagramShare}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#E09B3D] to-[#C21975] hover:opacity-90 transition-opacity text-white"
      >
        <Image src="/instagram.svg" alt="Instagram" width={24} height={24} />
        <span>Instagram 공유</span>
      </button>

      <button
        onClick={() => {
          navigator.clipboard.writeText(shareUrl);
          toast.success("링크가 복사되었습니다!");
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
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
        <span className="text-black">링크 복사</span>
      </button>
    </div>
  );
};
