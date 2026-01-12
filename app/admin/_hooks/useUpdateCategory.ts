import { useState } from 'react';
import { CategoryMutationPayload } from '@/app/_types'
import { updateAdminCategory } from "@/app/admin/_libs/admin-category-api";

export const useUpdateCategory = (id: string) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCategory = async (payload: CategoryMutationPayload) => {
    setIsUpdating(true);
    setError(null);
    try {
      await updateAdminCategory(id, payload);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'NG';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsUpdating(false);
    }
  };
  return { updateCategory, isUpdating, error };
};