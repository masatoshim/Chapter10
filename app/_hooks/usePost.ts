import { useState, useEffect } from 'react';
import { PostIndexResponse } from '@/app/api/posts/[id]/route'
import { fetchPost } from "@/app/_libs/getters";

export const usePost = (id: string) => {
  const [post, setPost] = useState<PostIndexResponse['post'] | null>(null);
  const [fetched, setFetched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // APIでpostを取得する処理をuseEffectで実行
  useEffect(() => {
    setFetched(false);
    fetchPost(id)
      .then(result => setPost(result.post))
      .catch(err => setError(err.message))
      .finally(() => setFetched(true));
  }, [id]);

  return { post, fetched, error };
}