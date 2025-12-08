"use client";

import classes from '@/app/styles/Detail.module.scss'
import { useState, useEffect } from 'react';
import { DetailType, PostType } from '@/lib/types'; 
import { fetchPost } from "@/lib/getters";
import Image from 'next/image';

export default function DetailPage({ id }: DetailType) {
  const [post, setPost] = useState<PostType | null>(null);
  const [fetched, setFetched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  // APIでpostを取得する処理をuseEffectで実行します。
  useEffect(() => {
    setFetched(false);
    fetchPost(id)
      .then(result => setPost(result.post))
      .catch(err => setError(err.message))
      .finally(() => setFetched(true));
  }, [id]);

  if (!fetched) return <div>読み込み中...</div>;
  if (!post) return <div>投稿が見つかりません</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={classes.container}>
      <div className={classes.post}>
        <div className={classes.postImage}><Image src={ post.thumbnailUrl } alt="" fill /></div>
        <div className={classes.postContent}>
          <div className={classes.postInfo}>
            <div className={classes.postDate}>{ new Date(post.createdAt).toLocaleDateString('ja-JP') }</div>
            <div className={classes.postCategories}>
              { post.categories.map((category, index) => <div className={classes.postCategory} key={`${post.id}-${index}`}>{category}</div>) }
            </div>
          </div>
          <h1 className={classes.postTitle}>{ post.title }</h1>
          <div className={classes.postBody} dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  );
}