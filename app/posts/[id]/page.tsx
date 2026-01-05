"use client";

import classes from '@/styles/Detail.module.scss'
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { usePost } from '@/app/_hooks/usePost';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { post, fetched, error } = usePost(id);

  if (!fetched) return <div>読み込み中...</div>;
  if (!post) return <div>投稿が見つかりません</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={classes.container}>
      <div className={classes.post}>
        <div className={classes.postImage}><Image src={ post.thumbnail.url } alt="" fill /></div>
        <div className={classes.postContent}>
          <div className={classes.postInfo}>
            <div className={classes.postDate}>{ new Date(post.createdAt).toLocaleDateString('ja-JP') }</div>
            <div className={classes.postCategories}>
              { post.categories.map((category, index) => <div className={classes.postCategory} key={`${post.id}-${index}`}>{category.name}</div>) }
            </div>
          </div>
          <h1 className={classes.postTitle}>{ post.title }</h1>
          <div className={classes.postBody} dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  );
}