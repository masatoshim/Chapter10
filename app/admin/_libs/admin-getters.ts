import { PostsIndexResponse } from '@/app/api/admin/posts/route'
import { PostIndexResponse } from '@/app/api/admin/posts/[id]/route'

// 投稿リストを取得する関数（管理者用）
export const fetchAdminPosts: () => Promise<PostsIndexResponse> = async () => {
  const res: Response = await fetch('http://localhost:3000/api/admin/posts')

  if (!res.ok) throw new Error(res.statusText);
  return await res.json() as PostsIndexResponse;
};

// 投稿を取得する関数（管理者用）
export const fetchAdminPost: (id: string) => Promise<PostIndexResponse> = async (id) => {
  if (!id) throw new Error("Post ID is required");
  const res: Response = await fetch(`http://localhost:3000/api/admin/posts/${id}`)

  if (!res.ok) throw new Error(res.statusText);
  return await res.json() as PostIndexResponse;
};