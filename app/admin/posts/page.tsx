"use client";

import classes from '@/app/admin/_styles/AdminList.module.scss'
import Link from "next/link";
import { useGetPosts } from '@/app/admin/_hooks/useGetPosts';

export default function AdminPostListPage() {
  const { posts, fetched, error } = useGetPosts();

  if (!fetched) return <div>読み込み中...</div>;
  if (posts.length === 0) return <div>記事が見つかりません</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <header className={classes.header}>
        <h1  className={classes.title}>
          記事一覧
        </h1>
        <Link href="/admin/posts/new" className={classes.createBtn}>
          新規作成
        </Link>
      </header>
      <div>
        <ul className={classes.contentList}>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/admin/posts/${post.id}`} className={classes.link}>
                <div className={classes.content}>
                  <span className={classes.contentTitle}>{post.title}</span>
                  <span className={classes.contentDate}>
                    {new Date(post.createdAt).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}