import { PostsIndexResponse, CreatePostRequestBody } from '@/app/api/admin/posts/route'
import { PostIndexResponse, UpdatePostRequestBody, PostUpdateResponse } from '@/app/api/admin/posts/[id]/route'
import { CategoriesIndexResponse, CreateCategoryRequestBody } from '@/app/api/admin/categories/route';
import { CategoryIndexResponse, UpdateCategoryRequestBody } from '@/app/api/admin/categories/[id]/route';

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
  payload: UpdatePostRequestBody
): Promise<PostUpdateResponse> => {
  const res = await fetch(`http://localhost:3000/api/admin/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'NG');
  }
  return data as PostUpdateResponse;
};

// 記事を削除する関数
export const deleteAdminPost = async (id: string | number): Promise<void> => {
  const res = await fetch(`http://localhost:3000/api/admin/posts/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'NG');
  }
};

/** 記事を新規作成する関数 */
export const createAdminPost = async (payload: CreatePostRequestBody): Promise<void> => {
  const res = await fetch(`http://localhost:3000/api/admin/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'NG');
};

// カテゴリーリストを取得する関数
export const fetchAdminCategories: () => Promise<CategoriesIndexResponse> = async () => {
  const res: Response = await fetch('http://localhost:3000/api/admin/categories')
  if (!res.ok) throw new Error(res.statusText);
  return await res.json() as CategoriesIndexResponse;
};

// カテゴリーを取得する関数
export const fetchAdminCategory = async (id: string): Promise<CategoryIndexResponse> => {
  const res = await fetch(`http://localhost:3000/api/admin/categories/${id}`);
  if (!res.ok) throw new Error(res.statusText);
  return await res.json();
};

/** カテゴリー名を更新する関数 */
export const updateAdminCategory = async (id: string, payload: UpdateCategoryRequestBody): Promise<void> => {
  const res = await fetch(`http://localhost:3000/api/admin/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'NG');
};

// カテゴリーを削除する関数
export const deleteAdminCategory = async (id: string | number): Promise<void> => {
  const res = await fetch(`http://localhost:3000/api/admin/categories/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'NG');
  }
};

/** カテゴリーを新規作成する関数 */
export const createAdminCategory = async (payload: CreateCategoryRequestBody): Promise<void> => {
  const res = await fetch(`http://localhost:3000/api/admin/categories`, {
    method: 'POST', // 新規作成はPOST
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'NG');
};