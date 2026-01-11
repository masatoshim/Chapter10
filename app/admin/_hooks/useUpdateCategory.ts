import { useState } from 'react';
import { updateAdminCategory } from "@/app/admin/_libs/admin-api";
import { UpdateCategoryRequestBody } from '@/app/api/admin/categories/[id]/route';

export const useUpdateCategory = (id: string) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCategory = async (payload: UpdateCategoryRequestBody) => {
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