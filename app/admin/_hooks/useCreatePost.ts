import { useState } from 'react';
import { PostMutationPayload } from '@/app/_types'
import { createAdminPost } from '@/app/admin/_libs/admin-post-api';

export const useCreatePost = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (payload: PostMutationPayload) => {
    setIsCreating(true);
    setError(null);
    try {
      await createAdminPost(payload);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'NG';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsCreating(false);
    }
  };
  return { createPost, isCreating, error };
};