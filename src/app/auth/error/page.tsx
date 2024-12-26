import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            로그인 중 오류가 발생했습니다
          </h1>
          <p className="text-sm text-muted-foreground">
            다시 시도해 주세요
          </p>
        </div>
        <Button asChild>
          <Link href="/auth/signin">
            로그인 페이지로 돌아가기
          </Link>
        </Button>
      </div>
    </div>
  );
}
