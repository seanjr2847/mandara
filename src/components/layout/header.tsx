import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-red-500">
            Mandara
          </Link>
          <nav className="flex gap-6">
            <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
              소개
            </Link>
            <Link href="/create" className="text-slate-400 hover:text-white transition-colors">
              시작하기
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
