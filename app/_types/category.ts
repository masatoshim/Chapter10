/**
 * カテゴリーの基本データ構造（単体・一覧共通）
 */
export interface Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * APIレスポンス用
 */
// 一覧取得
export interface CategoriesIndexResponse {
  categories: Category[];
}

// 詳細取得
export interface CategoryIndexResponse {
  category: Category | null;
}

// 更新成功時
export interface CategoryUpdateResponse {
  message: string;
  post: Category;
}

// 新規作成成功時
export interface CreateCategoryResponse {
  id: number;
}

/**
 * APIリクエスト(Body)用
 */
// 作成・更新で共通の形
export interface CategoryMutationPayload {
  name: string;
}