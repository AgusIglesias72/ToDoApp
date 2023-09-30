type UserProps = {
  user?: {
    name: string
    email: string
    image: string
  }
}

type Note = {
  id: number
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  userId: string
  completedAt: Date | null
  completed: Boolean
}

type NoteProps = {
  title: string
  content: string
  userId: string
}

type PostNote = {
  title: string
  content: string
}
