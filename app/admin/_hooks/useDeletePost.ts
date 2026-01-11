import { useState } from 'react';
import { deleteAdminPost } from '@/app/admin/_libs/admin-api';

export const useDeletePost = (id: string) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deletePost = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteAdminPost(id);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'NG';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsDeleting(false);
    }
  };

  return { deletePost, isDeleting, error };
};