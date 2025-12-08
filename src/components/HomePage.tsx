"use client";

import classes from '@/app/styles/Home.module.scss'
import { useState, useEffect } from 'react';
import Link from "next/link";
import { type PostType } from '@/lib/types'; 
import { fetchPosts } from "@/lib/getters";


export default function HomePage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    setFetched(false);
    fetchPosts()
      .then(result => setPosts(result.posts))
      .catch(err => setError(err.message))
      .finally(() => setFetched(true));
  }, []);

  if (!fetched) return <div>読み込み中...</div>;
  if (posts.length === 0) return <div>投稿が見つかりません</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className={classes.container}>
        <ul>
          {posts.map((post) => (
            <li className={classes.list} key={post.id}>
              <Link className={classes.link} href={`/posts/${post.id}`}>
                <div className={classes.post}>
                  <div>
                    <div className={classes.postInfo}>
                      <div className={classes.postDate}>{ new Date(post.createdAt).toLocaleDateString('ja-JP') }</div>
                      <div className={classes.postCategories}>
                        { post.categories.map((category, index) => <div className={classes.postCategory} key={`${post.id}-${index}`}>{category}</div>) }
                      </div>
                    </div>
                    <p className={classes.postTitle}>{ post.title }</p>
                    <div className={classes.postBody} dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}