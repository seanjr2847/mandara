"use client";

import { Button } from "@/components/ui/button";
import { MandalPreview } from "@/components/create/mandal-preview";
import Link from "next/link";

export default function AboutPage() {
  // 예시 만다라트 데이터
  const exampleMainGoal = "프로그래밍 마스터하기";
  const exampleSubGoals = [
    "알고리즘 학습",
    "프로젝트 포트폴리오",
    "새로운 언어 습득",
    "CS 지식 향상",
    "코드 품질 개선",
    "오픈소스 기여",
    "기술 블로그 운영",
    "네트워킹"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* 헤더 섹션 */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 via-yellow-300 to-red-500 text-transparent bg-clip-text animate-gradient">
            만다라트 차트란?
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            일본의 디자이너 이마이즈미 히로아키가 개발한 목표 달성 기법으로,
            핵심 목표를 중심으로 세부 목표를 체계적으로 정리하는 방법입니다.
          </p>
        </div>

        {/* 설명 섹션 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">만다라트 작성 방법</h2>
            <ol className="space-y-4 text-slate-300">
              <li className="flex gap-3">
                <span className="font-bold text-red-500">1.</span>
                <span>중앙에 달성하고 싶은 핵심 목표를 적습니다.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-red-500">2.</span>
                <span>핵심  위한 8개의 세부 목표를 주변에 적습니다.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-red-500">3.</span>
                <span>각 세부 목표에 대한 8개의 실천 항목을 작성합니다.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-red-500">4.</span>
                <span>총 64개의 실천 항목이 만들어지며, 이를 통해 목표를 체계적으로 달성할 수 있습니다.</span>
              </li>
            </ol>

            <div className="pt-6">
              <h2 className="text-2xl font-bold mb-4">만다라트의 장점</h2>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span>목표를 체계적으로 구조화할 수 있습니다.</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span>큰 목표를 작은 실천 항목으로 나눌 수 있습니다.</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span>시각적으로 목표를 파악할 수 있습니다.</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span>목표 달성 과정을 한눈에 확인할 수 있습니다.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 예시 만다라트 */}
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-center">만다라트 예시</h3>
            <MandalPreview
              mainGoal={exampleMainGoal}
              subGoals={exampleSubGoals}
            />
          </div>
        </div>

        {/* 시작하기 버튼 */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 rounded-full text-lg"
          >
            <Link href="/create">
              나만의 만다라트 만들기
            </Link>
          </Button>
        </div>

        {/* 눈 내리는 효과 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="snowflakes" aria-hidden="true">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="snowflake">❅</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
