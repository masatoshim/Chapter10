import { useState, useEffect } from 'react';
import { PostIndexResponse } from '@/app/api/admin/posts/[id]/route'
import { fetchAdminPost } from "@/app/admin/_libs/admin-api";

export const useGetPost = (id: string) => {
  const [post, setPost] = useState<PostIndexResponse['post'] | null>(null);
  const [fetched, setFetched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setFetched(false);
    fetchAdminPost(id)
      .then(result => setPost(result.post))
      .catch(err => setError(err.message))
      .finally(() => setFetched(true));
  }, [id]);

  return { post, fetched, error };
}