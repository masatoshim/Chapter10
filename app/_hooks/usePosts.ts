import { useState, useEffect } from 'react';
import { MicroCmsPost } from '@/app/_types/MicroCmsPost'; 
import { fetchPosts } from "@/app/_libs/getters";

export const usePosts = () => {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // APIでpostsを取得する処理をuseEffectで実行
  useEffect(() => {
    setFetched(false);
    fetchPosts()
      .then(result => setPosts(result))
      .catch(err => setError(err.message))
      .finally(() => setFetched(true));
  }, []);

  return { posts, fetched, error }
}