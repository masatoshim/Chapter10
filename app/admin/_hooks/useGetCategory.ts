import { useState, useEffect } from 'react';
import { CategoryIndexResponse } from '@/app/_types'
import { fetchAdminCategory } from "@/app/admin/_libs/admin-category-api";

export const useGetCategory = (id: string) => {
  const [category, setCategory] = useState<CategoryIndexResponse['category'] | null>(null);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setFetched(false);
    fetchAdminCategory(id)
      .then(result => setCategory(result.category))
      .catch(err => setError(err.message))
      .finally(() => setFetched(true));
  }, [id]);
  return { category, fetched, error };
};