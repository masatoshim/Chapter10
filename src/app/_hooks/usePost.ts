import { useState, useEffect } from 'react';
import { MicroCmsPost } from '@/app/_types/MicroCmsPost'; 
import { fetchPost } from "@/app/_lib/getters";

export const usePost = (id: string) => {
  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [fetched, setFetched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // APIでpostを取得する処理をuseEffectで実行
  useEffect(() => {
    setFetched(false);
    fetchPost(id)
      .then(result => setPost(result))
      .catch(err => setError(err.message))
      .finally(() => setFetched(true));
  }, [id]);

  return { post, fetched, error };
}