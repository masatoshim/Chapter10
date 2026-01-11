import { prisma } from '@/app/_libs/prisma'
import { NextResponse } from 'next/server'

// 記事APIのレスポンスの型
export interface PostIndexResponse {
  post: {
    id: number;
    title: string;
    content: string;
    thumbnailUrl: string;
    createdAt: Date;
    updatedAt: Date;
    postCategories: {
      category: {
        id: number;
        name: string;
      };
    }[];
  } | null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);
    const post = await prisma.post.findUnique({
      where: { id: id },
      include: {
        postCategories: {
          include: {
            category: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json<PostIndexResponse>({ post }, { status: 200 })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}

// 記事の更新時に送られてくるリクエストのbodyの型
export interface UpdatePostRequestBody {
  title: string;
  content: string;
  categoryIds: number[];
  thumbnailUrl: string;
}

export interface PostUpdateResponse {
  message: string;
  post: any;
}

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);
    const body = await request.json()
    const { title, content, thumbnailUrl, categoryIds }: UpdatePostRequestBody = body

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        thumbnailUrl,
        postCategories: {
          // 既存の関連を一度すべて削除して作り直す
          deleteMany: {}, 
          create: categoryIds.map((id: number) => ({
            categoryId: id,
          })),
        },
      },
      include: {
        postCategories: {
          include: {
            category: true,
          },
        },
      },
    })

    return NextResponse.json<PostUpdateResponse>({ message: "OK", post }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
  }
}

export const DELETE = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);

    // データベースから削除を実行
    // ※ onDelete: Cascade の設定により、紐づく PostCategory も自動削除
    const post = await prisma.post.delete({
      where: { id },
    })

    return NextResponse.json({ message: "OK", post }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
  }
}