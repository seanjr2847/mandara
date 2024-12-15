"use client";

import { useEffect, useState } from "react";
import { themes, fonts, Theme, Font } from "@/lib/share-customization";
import { FullMandal } from "@/components/share/full-mandal";
import { CustomizationOptions } from "@/components/share/customization-options";
import { ShareButtons } from "@/components/share/share-buttons";
import { useMandalStore } from "@/lib/stores/mandal";

interface SharePageProps {
  params: {
    id: string;
  };
}

export default function SharePage({ params }: SharePageProps) {
  const { id } = params;
  const mandal = useMandalStore((state) => state.mandal);
  const fetchMandal = useMandalStore((state) => state.fetchMandal);

  const [theme, setTheme] = useState("default");
  const [font, setFont] = useState("default");
  const [showAuthor, setShowAuthor] = useState(true);
  const [showDate, setShowDate] = useState(true);

  useEffect(() => {
    fetchMandal(id);
  }, [id, fetchMandal]);

  if (!mandal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-center">
              {mandal.mainGoal}
            </h1>
            {(showAuthor || showDate) && (
              <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                {showAuthor && <span>작성자: {mandal.author || "익명"}</span>}
                {showDate && (
                  <span>
                    작성일: {mandal.createdAt ? new Date(mandal.createdAt).toLocaleDateString() : '날짜 없음'}
                  </span>
                )}
              </div>
            )}
            <CustomizationOptions
              theme={theme}
              font={font}
              showAuthor={showAuthor}
              showDate={showDate}
              onThemeChange={setTheme}
              onFontChange={setFont}
              onShowAuthorChange={setShowAuthor}
              onShowDateChange={setShowDate}
            />
            <div className="bg-background rounded-lg p-6">
              <FullMandal
                data={mandal}
                theme={themes[theme] as Theme}
                font={fonts[font] as Font}
                showAuthor={showAuthor}
                showDate={showDate}
              />
            </div>
            <ShareButtons shareUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/share/${params.id}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
