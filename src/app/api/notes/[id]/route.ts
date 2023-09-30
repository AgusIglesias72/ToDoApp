import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { getToken } from 'next-auth/jwt'

interface Params {
  params: { id: string }
}

export async function POST(req: NextRequest, { params }: Params) {
  try {
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

    const completedTask = await prisma.note.update({
      where: {
        id: Number(params.id),
        userId: userId,
      },
      data: {
        completed: true,
        completedAt: new Date(),
      },
    })

    if (!completedTask) {
      return NextResponse.json({
        message: 'Note not found',
        status: 404,
      })
    }
    return NextResponse.json({
      message: 'Note completed',
      status: 200,
      completedTask,
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({
          message: 'Note not found',
          status: 404,
        })
      }

      return NextResponse.json({
        message: error.message,
        status: 500,
      })
    }
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const note = await prisma.note.findUnique({
      where: {
        id: Number(params.id),
      },
    })
    if (!note) {
      return NextResponse.json({
        message: 'Note not found',
        status: 404,
      })
    }
    return NextResponse.json(note)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({
          message: 'Note not found',
          status: 404,
        })
      }

      return NextResponse.json({
        message: error.message,
        status: 500,
      })
    }
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const body: PostNote = await req.json()
    const { title, content } = body

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

    const editedNote = await prisma.note.update({
      where: {
        id: Number(params.id),
        userId: userId,
      },
      data: {
        title,
        content,
      },
    })

    if (!editedNote) {
      return NextResponse.json({
        message: 'Note not found',
        status: 404,
      })
    }
    return NextResponse.json({
      message: 'Note updated',
      status: 200,
      editedNote,
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({
          message: 'Note not found',
          status: 404,
        })
      }

      return NextResponse.json({
        message: error.message,
        status: 500,
      })
    }
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
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

    const deletedNote = await prisma.note.delete({
      where: {
        id: Number(params.id),
        userId: userId,
      },
    })

    if (!deletedNote) {
      return NextResponse.json({
        message: 'Note not found',
        status: 404,
      })
    }
    return NextResponse.json({
      message: 'Note deleted',
      status: 200,
      deletedNote,
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({
          message: 'Note not found',
          status: 404,
        })
      }

      return NextResponse.json({
        message: error.message,
        status: 500,
      })
    }
  }
}
