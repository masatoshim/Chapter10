import { prisma } from '@/app/_libs/prisma'
import { NextResponse } from 'next/server'

// カテゴリー一覧APIのレスポンスの型
export type CategoriesIndexResponse = {
  categories: {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
  }[]
}

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json<CategoriesIndexResponse>({ categories }, { status: 200 })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { name } = body

    if (!name) {
      return NextResponse.json({ message: "カテゴリー名は必須です" }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    })

    return NextResponse.json({ category }, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
  }
}