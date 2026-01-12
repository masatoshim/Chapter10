import { prisma } from '@/app/_libs/prisma'
import { NextResponse } from 'next/server'
import { PostIndexResponse } from '@/app/_types'

// 記事取得
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
              select: { id: true, name: true, createdAt: true, updatedAt: true },
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