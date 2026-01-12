import { prisma } from '@/app/_libs/prisma'
import { NextResponse } from 'next/server'
import { PostsIndexResponse } from '@/app/_types'

// 記事一覧取得
export const GET = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        postCategories: {
          include: {
            category: {
              select: { id: true, name: true, createdAt: true, updatedAt: true },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json<PostsIndexResponse>({ posts }, { status: 200 })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}