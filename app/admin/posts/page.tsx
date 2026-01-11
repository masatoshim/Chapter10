"use client";

import classes from '@/app/admin/_styles/AdminPostList.module.scss'
import Link from "next/link";
import { useAdminPosts } from '@/app/admin/_hooks/useAdminPosts';

export default function AdminPostListPage() {
  const { posts, fetched, error } = useAdminPosts();

  if (!fetched) return <div>読み込み中...</div>;
  if (posts.length === 0) return <div>投稿が見つかりません</div>;
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
        <ul className={classes.postList}>
          {posts.map((post) => (
            <li key={post.id} className={classes.postItem}>
              <Link href={`/admin/posts/${post.id}`} className={classes.link}>
                <div className={classes.postContent}>
                  <span className={classes.postTitle}>{post.title}</span>
                  <span className={classes.postDate}>
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