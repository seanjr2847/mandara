import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NavHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Mandara
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link href="/explore">
            <Button variant="ghost">둘러보기</Button>
          </Link>
          <Link href="/create">
            <Button>만들기</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
