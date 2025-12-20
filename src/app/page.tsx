"use client";

import classes from '@/styles/Home.module.scss'
import Link from "next/link";
import { usePosts } from './_hooks/usePosts';

export default function HomePage() {
  const { posts, fetched, error } = usePosts();

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
                        { post.categories.map((category, index) => <div className={classes.postCategory} key={`${post.id}-${index}`}>{category.name}</div>) }
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