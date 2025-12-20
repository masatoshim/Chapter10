import { useState, useEffect } from 'react';
import { MicroCmsPost } from '@/app/_types/MicroCmsPost'; 
import { useParams } from "next/navigation";
import { fetchPost } from "@/app/_lib/getters";

export const usePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [fetched, setFetched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // APIでpostを取得する処理をuseEffectで実行
  useEffect(() => {
    setFetched(false);
    const postId = Array.isArray(id) ? id[0] : id; // string[] の場合は先頭を使用
    fetchPost(postId)
      .then(result => setPost(result))
      .catch(err => setError(err.message))
      .finally(() => setFetched(true));
  }, [id]);

  return { post, fetched, error };
}