import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    const userId = token?.sub

    if (!userId) {
      return NextResponse.json({
        message: 'Unauthorized',
        status: 401,
      })
    }

    const notes: Note[] = await prisma.note.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(notes)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        status: 500,
      })
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: PostNote = await req.json()
    const { title, content } = body

    // Validations
    if (!title || !content) {
      return NextResponse.json({
        message: 'Title and content are required',
        status: 400,
      })
    }

    if (title.length > 100) {
      return NextResponse.json({
        message: 'Title is too long',
        status: 400,
      })
    }

    if (title.length < 3) {
      return NextResponse.json({
        message: 'Title is too short',
        status: 400,
      })
    }

    const token = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    const userId = token?.sub

    if (!userId) {
      return NextResponse.json({
        message: 'Unauthorized',
        status: 401,
      })
    }

    const newNote = await prisma.note.create({
      data: {
        title: title,
        content: content,
        userId: userId,
      },
    })

    return NextResponse.json({
      status: 200,
      note: newNote,
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        status: 500,
      })
    }
  }
}
