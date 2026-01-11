import { useState, useEffect } from 'react';
import { PostsIndexResponse } from '@/app/_types'
import { fetchPosts } from "@/app/_libs/getters";

export const usePosts = () => {
  const [posts, setPosts] = useState<PostsIndexResponse['posts']>([]);;
  const [fetched, setFetched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setFetched(false);
    fetchPosts()
      .then(result => {
        setPosts(result.posts); 
      })
      .catch(err => setError(err.message))
      .finally(() => setFetched(true));
  }, []);
  return { posts, fetched, error }
}