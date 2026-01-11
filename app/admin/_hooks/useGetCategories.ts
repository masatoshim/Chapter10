import { useState, useEffect } from 'react';
import { CategoriesIndexResponse } from '@/app/api/admin/categories/route';
import { fetchAdminCategories } from "@/app/admin/_libs/admin-api";

export const useGetCategories = () => {
  const [categories, setCategories] = useState<CategoriesIndexResponse['categories']>([]);;
  const [fetched, setFetched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setFetched(false);
    fetchAdminCategories()
      .then(result => setCategories(result.categories))
      .catch(err => setError(err.message))
      .finally(() => setFetched(true));
  }, []);

  return { categories, fetched, error }
}