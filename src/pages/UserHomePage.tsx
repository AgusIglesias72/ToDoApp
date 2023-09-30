import CardNote from '@/components/Notes/CardNote'
import { getNotes } from '@/services'
import { cookies } from 'next/headers'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import BottomNavigation from '@/components/BottomNavigation'

export default async function UserHomePage() {
  const cookieStore = cookies()
  const ListOfCookies: RequestCookie[] = cookieStore.getAll()
  const notes: Note[] = await getNotes(ListOfCookies)

  return (
    <>
      <main
        className="flex flex-col items-center pt-10 md:pt-6 flex-1 px-10 text-center
      bg-gradient-to-b from-white via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
      h-full min-h-screen
      "
      >
        <div className="flex flex-wrap flex-col items-center justify-around max-w-4xl py-4 sm:w-full gap-4 md:gap-8">
          {notes &&
            notes.map((note: Note) => <CardNote key={note.id} {...note} />)}
        </div>
      </main>
      <BottomNavigation />
    </>
  )
}
