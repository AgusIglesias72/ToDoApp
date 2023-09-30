import type { Metadata } from 'next'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}

export const metadata: Metadata = {
  title: 'To Do App - My Notes',
  description: 'The page where all my notes are stored',
}
