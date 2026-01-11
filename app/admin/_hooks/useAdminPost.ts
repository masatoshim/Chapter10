import { useState, useEffect } from 'react';
import { PostIndexResponse } from '@/app/api/admin/posts/[id]/route'
import { fetchAdminPost } from "@/app/admin/_libs/admin-getters";

export const useAdminPost = (id: string) => {
  const [post, setPost] = useState<PostIndexResponse['post'] | null>(null);
  const [fetched, setFetched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // APIでpostを取得する処理をuseEffectで実行
  useEffect(() => {
    setFetched(false);
    fetchAdminPost(id)
      .then(result => setPost(result.post))
      .catch(err => setError(err.message))
      .finally(() => setFetched(true));
  }, [id]);

  return { post, fetched, error };
}