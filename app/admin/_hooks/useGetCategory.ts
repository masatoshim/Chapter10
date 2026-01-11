import { useState, useEffect } from 'react';
import { fetchAdminCategory } from "@/app/admin/_libs/admin-api";

export const useGetCategory = (id: string) => {
  const [category, setCategory] = useState<{id: number, name: string} | null>(null);
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