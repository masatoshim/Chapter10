import { MicroCmsPost } from "../_types/MicroCmsPost";

// 投稿リストを取得する関数
export const fetchPosts: () => Promise<MicroCmsPost[]> = async () => {
  const res: Response = await fetch('https://i6nu3ypvfq.microcms.io/api/v1/posts', {
    headers: {
      'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
    },
  })

  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  return json.contents as MicroCmsPost[]; 
};

// 投稿を取得する関数
export const fetchPost: (id: string) => Promise<MicroCmsPost> = async (id) => {
  if (!id) throw new Error("Post ID is required");
  const res: Response = await fetch(`https://i6nu3ypvfq.microcms.io/api/v1/posts/${id}`, {
    headers: {
      'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
    },
  })

  if (!res.ok) throw new Error(res.statusText);
  return await res.json() as MicroCmsPost;
};