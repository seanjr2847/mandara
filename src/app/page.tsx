"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import "@/styles/snow.css";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-8rem)] relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[calc(100vh-8rem)] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                2025년,{" "}
                <span className="text-red-500">목표를 이루는</span>
                <br />
                가장 체계적인 방법
              </h1>
              <p className="text-xl text-slate-400">
                만다라트 차트로 목표를 세분화하고
                <br className="hidden sm:block" />
                단계별로 실천해보세요
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/create" className="block">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-12 py-6 text-lg rounded-full"
                >
                  시작하기
                </Button>
              </Link>
              <Link href="/about" className="block">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto px-12 py-6 text-lg rounded-full"
                >
                  자세히 보기
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* 배경 장식 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-950 to-transparent"></div>
        </div>
      </div>

      {/* 눈 내리는 효과 */}
      <div className="snowflakes" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="snowflake">❅</div>
        ))}
      </div>

      {/* 하단 설명 */}
      <div className="bg-slate-950">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto text-center"
          >
          </motion.div>
        </div>
      </div>
    </main>
  );
}
