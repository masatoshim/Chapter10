import { useState } from 'react';
import { createAdminCategory } from '@/app/admin/_libs/admin-api';
import { CreateCategoryRequestBody } from '@/app/api/admin/categories/route';

export const useCreateCategory = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCategory = async (payload: CreateCategoryRequestBody) => {
    setIsCreating(true);
    setError(null);
    try {
      await createAdminCategory(payload);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'NG';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsCreating(false);
    }
  };
  return { createCategory, isCreating, error };
};