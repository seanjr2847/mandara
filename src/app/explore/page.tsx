"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { themes } from "@/lib/share-customization";
import { cn } from "@/lib/utils";

interface SharedMandal {
  id: string;
  mainGoal: string;
  authorName: string;
  viewCount: number;
  likeCount: number;
  theme: string;
  createdAt: string;
}

export default function ExplorePage() {
  const [sharedMandals, setSharedMandals] = useState<SharedMandal[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchMandals = async (currentCursor?: string) => {
    try {
      const url = `/api/share${currentCursor ? `?cursor=${currentCursor}` : ""}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch mandals");
      
      const data = await response.json();
      
      if (currentCursor) {
        setSharedMandals(prev => [...prev, ...data.items]);
      } else {
        setSharedMandals(data.items);
      }
      
      setHasMore(!!data.nextCursor);
      setCursor(data.nextCursor);
    } catch (error) {
      console.error("Error fetching mandals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMandals();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">만다라트 둘러보기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sharedMandals.map((mandal) => (
          <Link key={mandal.id} href={`/share/${mandal.id}`}>
            <Card className={cn(
              "hover:shadow-lg transition-shadow cursor-pointer",
              themes[mandal.theme as keyof typeof themes].background,
              themes[mandal.theme as keyof typeof themes].text
            )}>
              <CardHeader>
                <CardTitle className="line-clamp-2">{mandal.mainGoal}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">작성자: {mandal.authorName}</p>
                  <p className="text-sm">작성일: {new Date(mandal.createdAt).toLocaleDateString()}</p>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>👁️ {mandal.viewCount}</span>
                    <span>❤️ {mandal.likeCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => fetchMandals(cursor || undefined)}
          >
            더 보기
          </Button>
        </div>
      )}
    </div>
  );
}
