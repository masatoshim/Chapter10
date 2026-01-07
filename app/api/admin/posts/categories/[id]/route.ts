import { prisma } from '@/app/_libs/prisma'
import { NextResponse } from 'next/server'

// カテゴリー詳細APIのレスポンスの型
export type CategoryResponse = {
  category: {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
  } | null
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)

    const category = await prisma.category.findUnique({
      where: { id },
    })

    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 })
    }

    return NextResponse.json<CategoryResponse>({ category }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
  }
}

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = Number(params.id)
    const body = await request.json()
    const { name } = body

    if (!name) {
      return NextResponse.json({ message: "カテゴリー名は必須です" }, { status: 400 })
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
      },
    })

    return NextResponse.json({ message: "OK", category }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
  }
}

export const DELETE = async (
  _request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = Number(params.id)

    // カテゴリーの削除を実行
    // ※ onDelete: Cascade により、PostCategory の紐付けレコードも自動削除される
    const category = await prisma.category.delete({
      where: { id },
    })

    return NextResponse.json({ message: "OK", category }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
  }
}