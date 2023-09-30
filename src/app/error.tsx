'use client'

import StandardError from '@/components/StandardError'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <>
      <main
        className="flex flex-col items-center pt-10 md:pt-6 flex-1 px-10 text-center
      bg-gradient-to-b from-white via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
      h-full min-h-screen
      "
      >
        <StandardError error={error} reset={reset} />
      </main>
    </>
  )
}
