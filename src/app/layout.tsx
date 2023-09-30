import NavbarWithDropdown from '@/components/Navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import './globals.css'
import type { Metadata } from 'next'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session: UserProps = (await getServerSession(authOptions)) || {}
  return (
    <html lang="en">
      <head />
      <body>
        <NavbarWithDropdown imageUrl={session?.user?.image || ''} />
        {children}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'To Do App - Home',
  description: 'Notes app to keep track of your tasks',
}
