import { useState, useEffect } from 'react';
import { PostsIndexResponse } from '@/app/api/admin/posts/route'
import { fetchAdminPosts } from "@/app/admin/_libs/admin-api";

export const useGetPosts = () => {
  const [posts, setPosts] = useState<PostsIndexResponse['posts']>([]);;
  const [fetched, setFetched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setFetched(false);
    fetchAdminPosts()
      .then(result => setPosts(result.posts))
      .catch(err => setError(err.message))
      .finally(() => setFetched(true));
  }, []);

  return { posts, fetched, error }
}