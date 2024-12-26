"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Heart, HeartOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LikeButtonProps {
  mandalId: string;
  initialLikeCount: number;
}

export function LikeButton({ mandalId, initialLikeCount }: LikeButtonProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!session) return;

      try {
        const response = await fetch(`/api/share/${mandalId}/like`);
        const data = await response.json();
        setLiked(data.liked);
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };

    checkLikeStatus();
  }, [mandalId, session]);

  const handleLike = async () => {
    if (!session) {
      toast({
        title: "로그인이 필요합니다",
        description: "좋아요를 누르려면 로그인이 필요합니다.",
        variant: "destructive",
      });
      signIn("google");
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/share/${mandalId}/like`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to like");

      const data = await response.json();
      setLiked(data.liked);
      setLikeCount(prev => data.liked ? prev + 1 : prev - 1);
    } catch (error) {
      console.error("Error liking mandal:", error);
      toast({
        title: "오류",
        description: "좋아요 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      disabled={loading}
      className="gap-2"
    >
      {liked ? (
        <Heart className="w-4 h-4 fill-current text-red-500" />
      ) : (
        <HeartOff className="w-4 h-4" />
      )}
      <span>{likeCount}</span>
    </Button>
  );
}
