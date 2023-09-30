import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  return NextResponse.json({
    token,
  })
}
