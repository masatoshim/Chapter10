import './App.css';
import type { LayoutProps } from '@/app/_types/LayoutProps';
import Link from "next/link";

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ja">
      <head />
      <body>
        <header className="header">
          <Link className="header-link" href="/">Blog</Link>
          <Link className="header-link" href="/contact">お問い合わせ</Link>
        </header>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}