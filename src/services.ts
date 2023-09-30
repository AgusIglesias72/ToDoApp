import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export const getNotes = async (cookiesList: RequestCookie[]) => {
  const cookies: string[] = cookiesList?.map((cookie) => {
    return `${cookie.name}=${cookie.value}`
  })

  const parsedCookie = cookies?.join('; ')

  const response = await fetch(process.env.NEXTAUTH_URL + `/api/notes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: parsedCookie,
    },

    next: {
      revalidate: 0,
      tags: [`${parsedCookie}`],
    },
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return await response.json()
}

export const createNote = async (note: PostNote) => {
  const response = await fetch(`api/notes`, {
    method: 'POST',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}

export const editNote = async (note: PostNote, id: number) => {
  const response = await fetch(`api/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}

export const completeNote = async (id: number) => {
  const response = await fetch(`api/notes/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}

export const deleteNote = async (id: number) => {
  const response = await fetch(`api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}
