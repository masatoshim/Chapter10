import { prisma } from '@/app/_libs/prisma'
import { NextResponse } from 'next/server'

// 投稿一覧APIのレスポンスの型
export type PostsIndexResponse = {
  posts: {
    id: number
    title: string
    content: string
    thumbnailUrl: string
    createdAt: Date
    updatedAt: Date
    postCategories: {
      category: {
        id: number
        name: string
      }
    }[]
  }[]
}

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        postCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
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

// 投稿作成時に送られてくるリクエストのbodyの型
export type CreatePostRequestBody = {
  title: string
  content: string
  categoryIds: number[]
  thumbnailUrl: string
}

// 投稿作成APIのレスポンスの型
export type CreatePostResponse = {
  id: number
}

export const POST = async (request: Request) => {
  try {
    const body: CreatePostRequestBody  = await request.json()
    const { title, content, thumbnailUrl, categoryIds } = body

    const post = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailUrl,
        postCategories: {
          create: categoryIds.map((id: number) => ({
            categoryId: id,
          })),
        },
      },
    })

    return NextResponse.json<CreatePostResponse>({
      id: post.id,
    })

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
  }
}