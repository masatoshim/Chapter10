"use client";

import { useState, useEffect } from 'react';
import classes from '@/app/admin/_styles/AdminEdit.module.scss'; // 編集用SCSS
import { useParams } from 'next/navigation';
import { useAdminPost } from '@/app/admin/_hooks/useAdminPost';
import Link from "next/link";

export default function AdminEditPage() {
  const { id } = useParams<{ id: string }>();
  const { post, fetched, error } = useAdminPost(id);

  // 入力値を管理するステート
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  // データが取得できたらステートにセット
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setThumbnailUrl(post.thumbnailUrl);
    }
  }, [post]);

  if (!fetched) return <div>読み込み中...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>投稿が見つかりません</div>;

  return (
    <div className={classes.adminContainer}>
      <header className={classes.header}>
        <h1 className={classes.title}>記事編集</h1>
      </header>

      <form className={classes.form}>
        <div className={classes.field}>
          <label>タイトル</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>

        <div className={classes.field}>
          <label>サムネイルURL</label>
          <input 
            type="text" 
            value={thumbnailUrl} 
            onChange={(e) => setThumbnailUrl(e.target.value)} 
          />
        </div>

        <div className={classes.field}>
          <label>内容</label>
          <textarea 
            rows={10} 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          />
        </div>

        <div className={classes.field}>
          <label>カテゴリー</label>
          <div className={classes.categoryList}>
            {post.postCategories.map((category, index) => (
              <span className={classes.postCategory} key={`${post.id}-${index}`}>
                {category.category.name}
              </span>
            ))}
          </div>
        </div>
        <div className={classes.actionButtons}>
          <button type="button" className={classes.updateBtn}>
            更新
          </button>
          <button type="button" className={classes.deleteBtn}>
            削除
          </button>
        </div>
      </form>
    </div>
  );
}