import { useState } from 'react';
import { deleteAdminCategory } from '@/app/admin/_libs/admin-category-api';

export const useDeleteCategory = (id: string) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteCategory = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteAdminCategory(id);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'NG';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsDeleting(false);
    }
  };
  return { deleteCategory, isDeleting, error };
};