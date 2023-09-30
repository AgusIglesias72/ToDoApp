import NavbarWithDropdown from '@/components/Navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import './globals.css'
import type { Metadata } from 'next'
import FooterApp from '@/components/Footer'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session: UserProps = (await getServerSession(authOptions)) || {}
  return (
    <html lang="en">
      <head />
      <body
        className="
      "
      >
        <NavbarWithDropdown imageUrl={session?.user?.image || ''} />
        <main
          className="flex flex-col items-center pt-10 md:pt-6 flex-1 px-10 text-center
      bg-gradient-to-b from-white via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
      h-full min-h-screen
      "
        >
          {children}
        </main>
        <FooterApp />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'To Do App - Home',
  description: 'Notes app to keep track of your tasks',
}
