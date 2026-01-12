import { PostsIndexResponse, PostIndexResponse } from '@/app/_types'

// 記事リストを取得する関数
export const fetchPosts: () => Promise<PostsIndexResponse> = async () => {
  const res: Response = await fetch('http://localhost:3000/api/posts')
  if (!res.ok) throw new Error(res.statusText);
  return await res.json() as PostsIndexResponse;
};

// 記事を取得する関数
export const fetchPost: (id: string) => Promise<PostIndexResponse> = async (id) => {
  if (!id) throw new Error("Post ID is required");
  const res: Response = await fetch(`http://localhost:3000/api/posts/${id}`)
  if (!res.ok) throw new Error(res.statusText);
  return await res.json() as PostIndexResponse;
};