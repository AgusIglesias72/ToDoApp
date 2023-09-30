import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

const { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID, NEXTAUTH_SECRET } = process.env

export const authOptions: any = {
  session: { strategy: 'jwt' },
  secret: NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     return { ...token, user }
  //   },

  //   async session({ session, token, user }) {
  //     return session
  //   },
  // },
}

const handler = NextAuth(authOptions as any)

export { handler as GET, handler as POST }
