import { useState } from 'react';
import { updateAdminPost } from '@/app/admin/_libs/admin-api';
import { UpdatePostRequestBody } from '@/app/api/admin/posts/[id]/route';

export const useUpdatePost = (id: string) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePost = async (payload: UpdatePostRequestBody) => {
    setIsUpdating(true);
    setError(null);
    try {
      await updateAdminPost(id, payload);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'NG';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsUpdating(false);
    }
  };
  return { updatePost, isUpdating, error };
};