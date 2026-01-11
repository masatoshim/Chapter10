import classes from '@/app/admin/_styles/Admin.module.scss'
import { LayoutProps } from '@/app/_types'
import Link from "next/link";

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className={classes.adminWrapper}>
      <div className={classes.sidebar}>
        <nav className={classes.nav}>
          <ul>
            <li><Link href="/admin/posts">記事一覧</Link></li>
            <li><Link href="/admin/categories">カテゴリー一覧</Link></li>
          </ul>
        </nav>
      </div>
      <div className={classes.mainContent}>
        {children}
      </div>
    </div>
  );
}