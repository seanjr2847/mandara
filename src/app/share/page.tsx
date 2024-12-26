"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Bookmark, Flag } from "lucide-react";
import { SharedMandalViewer } from "@/components/share/shared-mandal-viewer";
import { useQuery } from "@tanstack/react-query";

interface SharedMandal {
  id: string;
  mainGoal: string;
  subGoals: string[];
  authorName: string;
  viewCount: number;
  shareCount: number;
  likes: number;
  comments: number;
  bookmarks: number;
}

export default function SharePage() {
  const { data: sharedMandals, isLoading } = useQuery<SharedMandal[]>({
    queryKey: ["sharedMandals"],
    queryFn: async () => {
      const response = await fetch("/api/share");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">공유된 만다라트</h1>
      {(!sharedMandals || sharedMandals.length === 0) ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-4">아직 공유된 만다라트가 없습니다.</p>
          <p className="text-gray-400">
            만다라트를 만들고 다른 사람들과 공유해보세요!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sharedMandals?.map((mandal) => (
            <Card key={mandal.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <SharedMandalViewer
                  mainGoal={mandal.mainGoal}
                  subGoals={mandal.subGoals}
                  className="w-full aspect-square"
                />
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{mandal.mainGoal}</h2>
                  <p className="text-sm text-gray-500">작성자: {mandal.authorName}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>조회 {mandal.viewCount}</span>
                    <span>공유 {mandal.shareCount}</span>
                  </div>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{mandal.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{mandal.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Flag className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
