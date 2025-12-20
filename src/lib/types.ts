import type { ReactNode } from 'react';

export type PostType = {
    "id": number,
    "title": string,
    "thumbnailUrl": string,
    "createdAt": string,
    "categories": string[],
    "content": string
};

export type BlogListType = {
  "message": string,
  "posts": PostType[]
};

export type BlogType = {
  "message": string,
  "post": PostType
};

export type LayoutProps = Readonly<{
  children: ReactNode
}>;