import { CategoriesIndexResponse, CategoryIndexResponse, CategoryMutationPayload, CategoryUpdateResponse, CreateCategoryResponse } from '@/app/_types'

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
  return await res.json() as CategoryIndexResponse;
};

/** カテゴリー名を更新する関数 */
export const updateAdminCategory = async (id: string, payload: CategoryMutationPayload): Promise<CategoryUpdateResponse> => {
  const res = await fetch(`http://localhost:3000/api/admin/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'NG');
  return data as CategoryUpdateResponse;
};

// カテゴリーを削除する関数
export const deleteAdminCategory = async (id: string | number): Promise<void> => {
  const res = await fetch(`http://localhost:3000/api/admin/categories/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'NG');
};

/** カテゴリーを新規作成する関数 */
export const createAdminCategory = async (payload: CategoryMutationPayload): Promise<CreateCategoryResponse> => {
  const res = await fetch(`http://localhost:3000/api/admin/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'NG');
  return data as CreateCategoryResponse;
};