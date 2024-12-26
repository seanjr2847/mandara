import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            만다라트에 오신 것을 환영합니다
          </h1>
          <p className="text-sm text-muted-foreground">
            구글 계정으로 로그인하여 시작하세요
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          구글로 계속하기
        </Button>
      </div>
    </div>
  );
}
