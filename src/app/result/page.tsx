"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FullMandal } from "@/components/result/full-mandal";
import { CustomizationOptions } from "@/components/share/customization-options";
import { ShareDialog } from "@/components/result/share-dialog";
import { themes, fonts, Theme, Font } from "@/lib/share-customization";
import { useRouter } from "next/navigation";

export default function ResultPage() {
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
          theme={themes[theme] as Theme}
          font={fonts[font] as Font}
          showAuthor={showAuthor}
          showDate={showDate}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
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

          <div className="md:col-span-2 flex flex-col gap-4">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => router.push("/create")}
            >
              새로운 만다라트 만들기
            </Button>
            <ShareDialog
              mandalId={mandalId}
              theme={themes[theme]}
              font={fonts[font]}
              showAuthor={showAuthor}
              showDate={showDate}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
