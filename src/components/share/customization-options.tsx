"use client";

import { themes, fonts } from "@/lib/share-customization";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";

interface CustomizationOptionsProps {
  theme: string;
  font: string;
  showAuthor: boolean;
  showDate: boolean;
  onThemeChange: (theme: string) => void;
  onFontChange: (font: string) => void;
  onShowAuthorChange: (show: boolean) => void;
  onShowDateChange: (show: boolean) => void;
}

export function CustomizationOptions({
  theme,
  font,
  showAuthor,
  showDate,
  onThemeChange,
  onFontChange,
  onShowAuthorChange,
  onShowDateChange,
}: CustomizationOptionsProps) {
  return (
    <Card className="w-full bg-background border-none">
      <CardContent className="p-6 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Label className="text-base">테마 선택</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(themes).map(([key, themeOption]) => (
                  <button
                    key={key}
                    onClick={() => onThemeChange(key)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      theme === key
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {themeOption.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-base">글꼴 선택</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(fonts).map(([key, fontOption]) => (
                  <button
                    key={key}
                    onClick={() => onFontChange(key)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      font === key
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                    style={{ fontFamily: fontOption.className }}
                  >
                    {fontOption.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-base">표시 옵션</Label>
              <div className="space-y-3 mt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-author" className="cursor-pointer">
                    작성자 표시
                  </Label>
                  <Switch
                    id="show-author"
                    checked={showAuthor}
                    onCheckedChange={onShowAuthorChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-date" className="cursor-pointer">
                    작성일 표시
                  </Label>
                  <Switch
                    id="show-date"
                    checked={showDate}
                    onCheckedChange={onShowDateChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
