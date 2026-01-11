import { PostsIndexResponse, PostIndexResponse, PostMutationPayload, PostUpdateResponse, CreatePostResponse } from '@/app/_types'

// 記事リストを取得する関数（管理者用）
export const fetchAdminPosts: () => Promise<PostsIndexResponse> = async () => {
  const res: Response = await fetch('http://localhost:3000/api/admin/posts')
  if (!res.ok) throw new Error(res.statusText);
  return await res.json() as PostsIndexResponse;
};

// 記事を取得する関数（管理者用）
export const fetchAdminPost: (id: string) => Promise<PostIndexResponse> = async (id) => {
  if (!id) throw new Error("Post ID is required");
  const res: Response = await fetch(`http://localhost:3000/api/admin/posts/${id}`)
  if (!res.ok) throw new Error(res.statusText);
  return await res.json() as PostIndexResponse;
};

// 記事を更新する関数
export const updateAdminPost = async (
  id: string | number, 
  payload: PostMutationPayload
): Promise<PostUpdateResponse> => {
  const res = await fetch(`http://localhost:3000/api/admin/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'NG');
  return data as PostUpdateResponse;
};

// 記事を削除する関数
export const deleteAdminPost = async (id: string | number): Promise<void> => {
  const res = await fetch(`http://localhost:3000/api/admin/posts/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'NG');
};

/** 記事を新規作成する関数 */
export const createAdminPost = async (payload: PostMutationPayload): Promise<CreatePostResponse> => {
  const res = await fetch(`http://localhost:3000/api/admin/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'NG');
  return data as CreatePostResponse;
};