import { useState } from 'react';
import { createAdminPost } from '@/app/admin/_libs/admin-api';
import { CreatePostRequestBody } from '@/app/api/admin/posts/route';

export const useCreatePost = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (payload: CreatePostRequestBody) => {
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