"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FullMandal } from "@/components/result/full-mandal";
import { CustomizationOptions } from "@/components/share/customization-options";
import { ShareDialog } from "@/components/result/share-dialog";
import { themes, fonts } from "@/lib/share-customization";
import { useRouter } from "next/navigation";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [theme, setTheme] = useState("default");
  const [font, setFont] = useState("default");
  const [showAuthor, setShowAuthor] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [mandalId, setMandalId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setMandalId(id);
    }
  }, [searchParams]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <FullMandal
          theme={themes[theme as keyof typeof themes]}
          font={fonts[font as keyof typeof fonts]}
          showAuthor={showAuthor}
          showDate={showDate}
        />

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">커스터마이즈</h2>
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
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => router.push("/create")}>
            새로운 만다라트 만들기
          </Button>
          <ShareDialog
            mandalId={mandalId}
            theme={themes[theme as keyof typeof themes]}
            font={fonts[font as keyof typeof fonts]}
            showAuthor={showAuthor}
            showDate={showDate}
          />
        </div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}
