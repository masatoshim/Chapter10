import { BlogListType, BlogType } from "./types";

// 投稿リストを取得する関数
export const fetchPosts: () => Promise<BlogListType> = async () => {
  const res: Response = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts`);
  if (!res.ok) throw new Error(res.statusText);
  return await res.json() as BlogListType; 
};

// 投稿を取得する関数
export const fetchPost: (id?: string) => Promise<BlogType> = async (id?) => {
  if (!id) throw new Error("Post ID is required");
  const res: Response = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
  if (!res.ok) throw new Error(res.statusText);
  return await res.json() as BlogType;
};